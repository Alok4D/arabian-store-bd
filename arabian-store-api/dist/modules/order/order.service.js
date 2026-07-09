import { prisma } from '../../config/prisma.js';
import { Prisma } from '@prisma/client';
export const OrderService = {
    async createOrder(data) {
        return await prisma.order.create({
            data,
            include: {
                product: true,
            },
        });
    },
    async getAllOrders() {
        return await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                product: true,
            },
        });
    },
    async getOrderById(id) {
        return await prisma.order.findUnique({
            where: { id },
            include: {
                product: true,
            },
        });
    },
    async updateOrderStatus(id, status) {
        return await prisma.order.update({
            where: { id },
            data: { status },
        });
    },
    async deleteOrder(id) {
        return await prisma.order.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=order.service.js.map