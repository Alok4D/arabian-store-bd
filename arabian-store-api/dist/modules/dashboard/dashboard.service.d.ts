export declare const DashboardService: {
    getOverview(): Promise<{
        totalProducts: number;
        totalOrders: number;
        pendingOrders: number;
        confirmedOrders: number;
        deliveredOrders: number;
        cancelledOrders: number;
        totalRevenue: number;
        graphData: {
            date: string;
            revenue: number;
            orders: number;
        }[];
    }>;
};
//# sourceMappingURL=dashboard.service.d.ts.map