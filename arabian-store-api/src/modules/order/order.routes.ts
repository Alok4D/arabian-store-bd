import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from './order.controller.js';

const router = Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export const OrderRoutes = router;
