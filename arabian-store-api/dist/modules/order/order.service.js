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
    async getAllOrders(page = 1, limit = 10, status, search, startDate, endDate, minAmount, maxAmount, sortBy, sortOrder = 'desc') {
        const skip = (page - 1) * limit;
        // Build where clause
        const whereClause = {};
        if (status && status !== 'All') {
            whereClause.status = status;
        }
        if (search) {
            whereClause.OR = [
                { orderId: { contains: search, mode: 'insensitive' } },
                { customerName: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
                { product: { title: { contains: search, mode: 'insensitive' } } }
            ];
        }
        if (startDate || endDate) {
            whereClause.createdAt = {};
            if (startDate)
                whereClause.createdAt.gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                whereClause.createdAt.lte = end;
            }
        }
        if (minAmount !== undefined || maxAmount !== undefined) {
            whereClause.total = {};
            if (minAmount !== undefined)
                whereClause.total.gte = minAmount;
            if (maxAmount !== undefined)
                whereClause.total.lte = maxAmount;
        }
        // Build orderBy clause
        let orderByClause = { createdAt: 'desc' };
        if (sortBy === 'amount') {
            orderByClause = { total: sortOrder };
        }
        else if (sortBy === 'customer') {
            orderByClause = { customerName: sortOrder };
        }
        else if (sortBy === 'date') {
            orderByClause = { createdAt: sortOrder };
        }
        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: whereClause,
                orderBy: orderByClause,
                skip,
                take: limit,
                include: {
                    product: true,
                },
            }),
            prisma.order.count({ where: whereClause })
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