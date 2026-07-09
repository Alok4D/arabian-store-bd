import { Router } from 'express';
import { getShipping, updateShipping } from './shipping.controller.js';
const router = Router();
router.get('/', getShipping);
router.put('/', updateShipping);
export const ShippingRoutes = router;
//# sourceMappingURL=shipping.routes.js.map