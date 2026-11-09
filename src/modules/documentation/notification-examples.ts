import type {
  NotificationExampleRequest,
  templates,
} from '../notification-example/index.js';

type Example = {
  summary: string;
  description: string;
  value: NotificationExampleRequest;
};
// Documentation choices only: never used as runtime defaults.
export const notificationExamples = {
  'order-created': {
    full: {
      summary: 'Đầy đủ theo nghiệp vụ',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000001',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-order-created',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Đơn hàng mới (minh họa)',
          summary: 'Đơn hàng mới: dữ liệu hư cấu để thử tích hợp.',
          type: 'SYSTEM',
          priority: 'MEDIUM',
          custom_badge: {
            label: 'Đơn hàng mới',
            status: 'SUCCESS',
          },
        },
      },
    },
    minimal: {
      summary: 'Dùng giá trị mặc định',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Bỏ summary để dùng template của route; type/priority được Rita ID chuẩn hóa thành SYSTEM/MEDIUM. Badge null không hiển thị.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000002',
        occurredAt: '2026-11-09T03:00:00Z',
        data: {
          actor: null,
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Đơn hàng mới (minh họa)',
          custom_badge: null,
        },
      },
    },
    message: {
      summary: 'Có ngữ cảnh hội thoại',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Minh họa MESSAGE; scenario vẫn là sale.order-created.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000003',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-order-created-conversation',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Đơn hàng mới (minh họa)',
          summary: 'Đơn hàng mới: dữ liệu hư cấu để thử tích hợp.',
          type: 'MESSAGE',
          priority: 'MEDIUM',
          custom_badge: {
            label: 'Đơn hàng mới',
            status: 'SUCCESS',
          },
          group: {
            key: 'demo-order-created',
            type: 'MULTIPLE',
            name: 'Trao đổi đơn hàng mới',
          },
          message: {
            id: 'demo-order-created-message-1',
            text: 'Trao đổi minh họa về đơn hàng mới.',
            sentAt: '2026-11-09T03:00:00Z',
          },
        },
      },
    },
  },
  'stock-approval-requested': {
    full: {
      summary: 'Đầy đủ theo nghiệp vụ',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000004',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-stock-approval-requested',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Chờ duyệt kho (minh họa)',
          summary: 'Chờ duyệt kho: dữ liệu hư cấu để thử tích hợp.',
          type: 'REMINDER',
          priority: 'HIGH',
          custom_badge: {
            label: 'Chờ duyệt kho',
            status: 'WARNING',
          },
        },
      },
    },
    minimal: {
      summary: 'Dùng giá trị mặc định',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Bỏ summary để dùng template của route; type/priority được Rita ID chuẩn hóa thành SYSTEM/MEDIUM. Badge null không hiển thị.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000005',
        occurredAt: '2026-11-09T03:00:00Z',
        data: {
          actor: null,
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Chờ duyệt kho (minh họa)',
          custom_badge: null,
        },
      },
    },
    message: {
      summary: 'Có ngữ cảnh hội thoại',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Minh họa MESSAGE; scenario vẫn là sale.stock-approval-requested.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000006',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-stock-approval-requested-conversation',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Chờ duyệt kho (minh họa)',
          summary: 'Chờ duyệt kho: dữ liệu hư cấu để thử tích hợp.',
          type: 'MESSAGE',
          priority: 'MEDIUM',
          custom_badge: {
            label: 'Chờ duyệt kho',
            status: 'WARNING',
          },
          group: {
            key: 'demo-stock-approval-requested',
            type: 'MULTIPLE',
            name: 'Trao đổi chờ duyệt kho',
          },
          message: {
            id: 'demo-stock-approval-requested-message-1',
            text: 'Trao đổi minh họa về chờ duyệt kho.',
            sentAt: '2026-11-09T03:00:00Z',
          },
        },
      },
    },
  },
  'customer-support-requested': {
    full: {
      summary: 'Đầy đủ theo nghiệp vụ',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000007',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-customer-support-requested',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Cần hỗ trợ (minh họa)',
          summary: 'Cần hỗ trợ: dữ liệu hư cấu để thử tích hợp.',
          type: 'SYSTEM',
          priority: 'HIGH',
          custom_badge: {
            label: 'Cần hỗ trợ',
            status: 'WARNING',
          },
        },
      },
    },
    minimal: {
      summary: 'Dùng giá trị mặc định',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Bỏ summary để dùng template của route; type/priority được Rita ID chuẩn hóa thành SYSTEM/MEDIUM. Badge null không hiển thị.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000008',
        occurredAt: '2026-11-09T03:00:00Z',
        data: {
          actor: null,
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Cần hỗ trợ (minh họa)',
          custom_badge: null,
        },
      },
    },
    message: {
      summary: 'Có ngữ cảnh hội thoại',
      description:
        'Dữ liệu hư cấu: thay actor/recipient bằng UUID Rita ID hợp lệ. Sự kiện mới dùng messageId mới; retry giữ identity và nội dung. Đổi nội dung với messageId đã accepted có thể trả 409. Giá trị này là minh họa, không phải default theo route. Minh họa MESSAGE; scenario vẫn là sale.customer-support-requested.',
      value: {
        messageId: 'a0000000-0000-4000-8000-000000000009',
        occurredAt: '2026-11-09T03:00:00Z',
        correlationId: 'sale-demo-customer-support-requested-conversation',
        data: {
          actor: '11111111-1111-4111-8111-111111111111',
          recipientUserIds: ['22222222-2222-4222-8222-222222222222'],
          title: 'Cần hỗ trợ (minh họa)',
          summary: 'Cần hỗ trợ: dữ liệu hư cấu để thử tích hợp.',
          type: 'MESSAGE',
          priority: 'MEDIUM',
          custom_badge: {
            label: 'Cần hỗ trợ',
            status: 'WARNING',
          },
          group: {
            key: 'demo-customer-support-requested',
            type: 'MULTIPLE',
            name: 'Trao đổi cần hỗ trợ',
          },
          message: {
            id: 'demo-customer-support-requested-message-1',
            text: 'Trao đổi minh họa về cần hỗ trợ.',
            sentAt: '2026-11-09T03:00:00Z',
          },
        },
      },
    },
  },
} satisfies Record<
  keyof typeof templates,
  Record<'full' | 'minimal' | 'message', Example>
>;
