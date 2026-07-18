import { Router } from 'express';
import { getUnreadNotifications, markAllAsRead } from './notification.controller.js';

const router = Router();

// Route to get all unread notifications
router.get('/', getUnreadNotifications);

// Route to mark all notifications as read
router.patch('/mark-all-read', markAllAsRead);

export const NotificationRoutes = router;
