import { Router } from 'express';
import orderRoutes from './order.routes.js';
import authRoutes from './auth.routes.js';
const router = Router();
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);
export default router;
//# sourceMappingURL=index.js.map