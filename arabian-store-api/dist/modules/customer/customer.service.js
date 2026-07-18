import { prisma } from '../../config/prisma.js';
export const CustomerService = {
    async getAllCustomers() {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const customersMap = new Map();
        orders.forEach((order) => {
            if (!customersMap.has(order.phone)) {
                customersMap.set(order.phone, {
                    id: order.phone, // Use phone as unique ID for frontend key
                    name: order.customerName,
                    phone: order.phone,
                    address: order.address,
                    totalOrders: 0,
                    totalSpent: 0,
                    lastOrderDate: order.createdAt,
                });
            }
            const customer = customersMap.get(order.phone);
            customer.totalOrders += 1;
            customer.totalSpent += Number(order.total);
        });
        return Array.from(customersMap.values());
    },
    async deleteCustomerByPhone(phone) {
        if (!phone)
            throw new Error('Phone number is required');
        // Since we don't have a Customer table, we delete all orders associated with this phone
        const deleted = await prisma.order.deleteMany({
            where: { phone },
        });
        return deleted;
    },
};
//# sourceMappingURL=customer.service.js.map