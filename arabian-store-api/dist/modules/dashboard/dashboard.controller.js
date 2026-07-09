import {} from 'express';
import { DashboardService } from './dashboard.service.js';
export const getOverview = async (req, res) => {
    try {
        const overview = await DashboardService.getOverview();
        res.status(200).json({ success: true, data: overview });
    }
    catch (error) {
        console.error('Get overview error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//# sourceMappingURL=dashboard.controller.js.map