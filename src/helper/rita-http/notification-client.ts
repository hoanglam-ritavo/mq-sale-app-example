import type { AppConfig } from '../../config/env.js';
import { AppError } from '../../shared/errors/app-error.js';
export interface NotificationRequest {
  messageId: string;
  occurredAt: string;
  correlationId?: string;
  data: Record<string, unknown>;
}
export interface NotificationClient {
  send(input: NotificationRequest): Promise<void>;
  stop(): Promise<void>;
}
export const notificationFailureReasons = [
  'TIMEOUT',
  'TRANSPORT_ERROR',
  'UPSTREAM_REDIRECT',
  'UPSTREAM_HTTP_STATUS',
  'RESPONSE_READ_ERROR',
  'RESPONSE_TOO_LARGE',
  'INVALID_RESPONSE_JSON',
  'INVALID_RESPONSE_CONTRACT',
  'UNEXPECTED_CLIENT_ERROR',
] as const;
export type NotificationFailureReason =
  (typeof notificationFailureReasons)[number];
export class NotificationClientError extends AppError {
  constructor(
    status: number,
    code: string,
    message: string,
    public readonly reason?: NotificationFailureReason,
    public readonly upstreamStatus?: number,
  ) {
    super(status, code, message);
  }
}
export const unknownNotificationOutcome = (
  reason: NotificationFailureReason,
  upstreamStatus?: number,
) =>
  new NotificationClientError(
    reason === 'TIMEOUT' ? 504 : 502,
    'RITA_OUTCOME_UNKNOWN',
    'Acceptance is unknown; retry the same identity and content.',
    reason,
    upstreamStatus,
  );
export function notificationEndpoint(base: string): string {
  const url = new URL(base);
  url.pathname = url.pathname.replace(/\/+$/, '') + '/api-expose/notifications';
  return url.toString();
}
export function createNotificationClient(
  config: AppConfig,
  transport: typeof fetch = fetch,
  timeoutMs = 10000,
): NotificationClient {
  const operations = new Set<Promise<void>>();
  let stopping = false;
  async function dispatch(
    input: NotificationRequest,
    signal: AbortSignal,
    received: (status: number) => void,
  ) {
    let response: Response;
    try {
      response = await transport(
        notificationEndpoint(config.rita.apiBaseUrl!),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': config.rita.apiKey!,
          },
          body: JSON.stringify(input),
          redirect: 'manual',
          signal,
        },
      );
    } catch {
      throw unknownNotificationOutcome('TRANSPORT_ERROR');
    }
    received(response.status);
    if (response.status !== 200) {
      try {
        await response.body?.cancel();
      } catch {
        /* Preserve HTTP outcome. */
      }
      const status = response.status;
      if (status === 401)
        throw new NotificationClientError(
          502,
          'RITA_CREDENTIAL_REJECTED',
          'Rita integration credentials are not eligible.',
          undefined,
          status,
        );
      if ([400, 409, 413, 503].includes(status))
        throw new NotificationClientError(
          status,
          'RITA_HTTP_' + status,
          status === 409
            ? 'Notification identity has different content.'
            : status === 503
              ? 'Rita storage is unavailable; retry the same identity and content.'
              : 'Rita rejected the notification.',
          undefined,
          status,
        );
      throw unknownNotificationOutcome(
        status >= 300 && status < 400
          ? 'UPSTREAM_REDIRECT'
          : 'UPSTREAM_HTTP_STATUS',
        status,
      );
    }
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
    try {
      reader = response.body?.getReader();
    } catch {
      throw unknownNotificationOutcome('RESPONSE_READ_ERROR', 200);
    }
    if (!reader) throw unknownNotificationOutcome('INVALID_RESPONSE_JSON', 200);
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 16384)
          throw unknownNotificationOutcome('RESPONSE_TOO_LARGE', 200);
        chunks.push(value);
      }
    } catch (error) {
      if (error instanceof NotificationClientError) throw error;
      throw unknownNotificationOutcome('RESPONSE_READ_ERROR', 200);
    } finally {
      try {
        await reader.cancel();
      } catch {
        /* Preserve the original outcome. */
      }
    }
    let data: unknown;
    try {
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      throw unknownNotificationOutcome('INVALID_RESPONSE_JSON', 200);
    }
    if (
      !data ||
      typeof data !== 'object' ||
      !('messageId' in data) ||
      data.messageId !== input.messageId ||
      !('status' in data) ||
      data.status !== 'accepted'
    )
      throw unknownNotificationOutcome('INVALID_RESPONSE_CONTRACT', 200);
  }
  return {
    async send(input) {
      if (stopping)
        throw new NotificationClientError(
          503,
          'STOPPING',
          'Notification client is stopping.',
        );
      if (!config.rita.apiBaseUrl || !config.rita.apiKey)
        throw new NotificationClientError(
          503,
          'RITA_NOT_CONFIGURED',
          'Rita notification API is not configured.',
        );
      const controller = new AbortController();
      let timer: ReturnType<typeof setTimeout> | undefined;
      let upstreamStatus: number | undefined;
      const work = dispatch(input, controller.signal, (status) => {
        upstreamStatus = status;
      }).catch((error: unknown) => {
        if (error instanceof NotificationClientError) throw error;
        throw unknownNotificationOutcome(
          'UNEXPECTED_CLIENT_ERROR',
          upstreamStatus,
        );
      });
      operations.add(work);
      void work.finally(() => operations.delete(work)).catch(() => undefined);
      try {
        await Promise.race([
          work,
          new Promise<never>((_resolve, reject) => {
            timer = setTimeout(() => {
              reject(unknownNotificationOutcome('TIMEOUT', upstreamStatus));
              controller.abort();
            }, timeoutMs);
          }),
        ]);
      } finally {
        clearTimeout(timer);
      }
    },
    async stop() {
      stopping = true;
      await Promise.allSettled([...operations]);
    },
  };
}
