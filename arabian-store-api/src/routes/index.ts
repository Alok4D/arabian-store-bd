import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes.js';
import { ProductRoutes } from '../modules/product/product.routes.js';
import { OrderRoutes } from '../modules/order/order.routes.js';
import { CustomerRoutes } from '../modules/customer/customer.routes.js';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes.js';
import { ShippingRoutes } from '../modules/shipping/shipping.routes.js';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);
router.use('/customers', CustomerRoutes);
router.use('/dashboard', DashboardRoutes);
router.use('/shipping', ShippingRoutes);

export default router;
