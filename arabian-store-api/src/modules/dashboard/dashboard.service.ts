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

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    };
  }
};
