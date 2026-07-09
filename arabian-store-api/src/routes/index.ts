import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes.js';
import { ProductRoutes } from '../modules/product/product.routes.js';
import { OrderRoutes } from '../modules/order/order.routes.js';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes.js';
import { CustomerRoutes } from '../modules/customer/customer.routes.js';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/products', ProductRoutes);
router.use('/orders', OrderRoutes);
router.use('/dashboard', DashboardRoutes);
router.use('/customers', CustomerRoutes);

export default router;
