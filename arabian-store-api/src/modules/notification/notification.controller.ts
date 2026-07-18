import { type Request, type Response } from 'express';
import { NotificationService } from './notification.service.js';

export const getUnreadNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await NotificationService.getUnreadNotifications();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const markAllAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await NotificationService.markAllAsRead();
    res.status(200).json({ success: true, message: 'Notifications marked as read', count: result.count });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
