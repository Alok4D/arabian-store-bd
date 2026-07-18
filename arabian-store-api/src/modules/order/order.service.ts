import { prisma } from '../../config/prisma.js';
import { Prisma } from '@prisma/client';

export const OrderService = {
  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    return await prisma.order.create({
      data,
      include: {
        product: true,
      },
    });
  },

  async getAllOrders(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          product: true,
        },
      }),
      prisma.order.count()
    ]);

    return {
      orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  },

  async getOrderById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });
  },

  async updateOrderStatus(id: string, status: any) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  },

  async deleteOrder(id: string) {
    return await prisma.order.delete({
      where: { id },
    });
  },
};
