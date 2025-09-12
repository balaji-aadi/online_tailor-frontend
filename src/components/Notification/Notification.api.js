// import Api from '../../axios.js';

// export const NotificationApi = {
//   getAllNotification: () => Api.get("user/get-all-notification"),
//   updateNotification: (id,payload) => Api.put(`/user/update-notification/${id}`,payload),
//   updateAllNotification: () => Api.put(`/user/update-all-notification`),
// };


export const NotificationApi = {
  getAllNotifications: async (userRole) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data based on user role
    const mockNotifications = {
      admin: [
        {
          _id: '1',
          title: 'New Tailor Registration',
          message: 'A new tailor "John Smith" has registered and is awaiting approval.',
          type: 'general',
          priority: 'medium',
          isRead: false,
          recipientRole: 'admin',
          tailorId: 'tailor_123',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          title: 'Payment Dispute',
          message: 'Customer has raised a payment dispute for order #ORD-456.',
          type: 'payment',
          priority: 'high',
          isRead: false,
          recipientRole: 'admin',
          orderId: 'ORD-456',
          customerId: 'cust_789',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '3',
          title: 'Monthly Revenue Report',
          message: 'Your monthly revenue report is ready for review.',
          type: 'general',
          priority: 'low',
          isRead: true,
          recipientRole: 'admin',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      tailor: [
        {
          _id: '4',
          title: 'New Order Assignment',
          message: 'You have been assigned a new order #ORD-789 for a wedding dress.',
          type: 'order',
          priority: 'high',
          isRead: false,
          recipientRole: 'tailor',
          orderId: 'ORD-789',
          customerId: 'cust_456',
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '5',
          title: 'Measurement Reminder',
          message: 'Please take measurements for customer Sarah Johnson by tomorrow.',
          type: 'measurement',
          priority: 'medium',
          isRead: false,
          recipientRole: 'tailor',
          customerId: 'cust_789',
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '6',
          title: 'Delivery Scheduled',
          message: 'Order #ORD-123 is scheduled for delivery tomorrow at 2 PM.',
          type: 'delivery',
          priority: 'medium',
          isRead: true,
          recipientRole: 'tailor',
          orderId: 'ORD-123',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
        }
      ],
      customer: [
        {
          _id: '7',
          title: 'Order Confirmed',
          message: 'Your order #ORD-321 has been confirmed and is being processed.',
          type: 'order',
          priority: 'medium',
          isRead: false,
          recipientRole: 'customer',
          orderId: 'ORD-321',
          tailorId: 'tailor_456',
          createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
          _id: '8',
          title: 'Measurement Appointment',
          message: 'Your measurement appointment is scheduled for tomorrow at 10 AM.',
          type: 'appointment',
          priority: 'high',
          isRead: false,
          recipientRole: 'customer',
          tailorId: 'tailor_123',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '9',
          title: 'Payment Successful',
          message: 'Your payment of $250 for order #ORD-654 has been processed successfully.',
          type: 'payment',
          priority: 'low',
          isRead: true,
          recipientRole: 'customer',
          orderId: 'ORD-654',
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
        }
      ]
    };

    return {
      data: {
        data: mockNotifications[userRole] || []
      }
    };
  },

  markAsRead: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  },

  markAllAsRead: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },

  createNotification: async (notificationData) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      data: {
        ...notificationData,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  }
};