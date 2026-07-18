import prisma from '../../prisma.js';

export class NotificationService {
  /**
   * Create a new notification
   */
  static async createNotification(message: string) {
    return prisma.notification.create({
      data: {
        message
      }
    });
  }

  /**
   * Get all unread notifications
   */
  static async getUnreadNotifications() {
    return prisma.notification.findMany({
      where: {
        isRead: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead() {
    return prisma.notification.updateMany({
      where: {
        isRead: false
      },
      data: {
        isRead: true
      }
    });
  }
}
