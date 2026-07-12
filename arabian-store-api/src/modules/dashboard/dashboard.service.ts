import { prisma } from '../../config/prisma.js';

export const DashboardService = {
  async getOverview() {
    const [
      totalProducts,
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      ordersWithRevenue
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'CONFIRMED' } }),
      prisma.order.count({ where: { status: 'DELIVERED' } }),
      prisma.order.count({ where: { status: 'CANCELLED' } }),
      prisma.order.aggregate({
        where: {
          status: {
            notIn: ['CANCELLED'] // revenue usually excludes cancelled, adjust if needed
          }
        },
        _sum: {
          total: true
        }
      })
    ]);

    const totalRevenue = ordersWithRevenue._sum.total ? Number(ordersWithRevenue._sum.total) : 0;

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const recentOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        },
        status: {
          not: 'CANCELLED'
        }
      },
      select: {
        createdAt: true,
        total: true,
      }
    });

    const graphDataMap: { [key: string]: { date: string; revenue: number; orders: number } } = {};
    
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      graphDataMap[dateStr] = { date: dateStr, revenue: 0, orders: 0 };
    }

    recentOrders.forEach(order => {
      const dateStr = order.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (graphDataMap[dateStr]) {
        graphDataMap[dateStr].revenue += Number(order.total || 0);
        graphDataMap[dateStr].orders += 1;
      }
    });

    const graphData = Object.values(graphDataMap);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      graphData,
    };
  }
};
