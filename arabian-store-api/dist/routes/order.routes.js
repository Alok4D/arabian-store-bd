import { Router } from 'express';
import * as orderController from '../controllers/order.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { orderSchema } from '../schemas/order.schema.js';
import { authenticateAdmin } from '../middlewares/auth.middleware.js';
const router = Router();
router.post('/', validate(orderSchema), orderController.createOrder);
router.get('/', authenticateAdmin, orderController.getOrders);
export default router;
//# sourceMappingURL=order.routes.js.map