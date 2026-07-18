import { type Request, type Response } from 'express';
import { OrderService } from './order.service.js';
import { NotificationService } from '../notification/notification.service.js';
import { getIO } from '../../socket.js';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      customerName, phone, whatsapp, address, note,
      quantity, subtotal, shippingFee, total,
      paymentMethod, productId, status
    } = req.body;

    // Generate a unique order ID (e.g. AS-123456)
    const orderId = `AS-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await OrderService.createOrder({
      orderId,
      customerName,
      phone,
      whatsapp,
      address,
      note,
      quantity,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
      productId,
      status
    });
    
    // Emit real-time notification
    try {
      const io = getIO();
      const notificationMsg = `A new order has been created by ${customerName}!`;
      
      // Save to database
      const savedNotification = await NotificationService.createNotification(notificationMsg);
      
      io.emit('newOrder', {
        id: savedNotification.id,
        message: savedNotification.message,
        time: savedNotification.createdAt
      });
    } catch (socketError) {
      console.error('Socket/Notification error:', socketError);
    }

    res.status(201).json({ success: true, data: order });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;
    const minAmount = req.query.minAmount ? parseFloat(req.query.minAmount as string) : undefined;
    const maxAmount = req.query.maxAmount ? parseFloat(req.query.maxAmount as string) : undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined;
    
    const result = await OrderService.getAllOrders(
      page, limit, status, search, startDate, endDate, minAmount, maxAmount, sortBy, sortOrder
    );
    res.status(200).json({ success: true, data: result.orders, meta: result.meta });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await OrderService.getOrderById(req.params.id as string);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ success: false, message: 'Status is required' });
      return;
    }
    const order = await OrderService.updateOrderStatus(req.params.id as string, status);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    await OrderService.deleteOrder(req.params.id as string);
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
