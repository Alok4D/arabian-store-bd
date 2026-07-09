import { Router } from 'express';
import { getAllCustomers } from './customer.controller.js';
const router = Router();
router.get('/', getAllCustomers);
export const CustomerRoutes = router;
//# sourceMappingURL=customer.routes.js.map