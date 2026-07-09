import { Router } from 'express';
import { getOverview } from './dashboard.controller.js';
const router = Router();
router.get('/overview', getOverview);
export const DashboardRoutes = router;
//# sourceMappingURL=dashboard.routes.js.map