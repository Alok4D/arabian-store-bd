import { Prisma } from '@prisma/client';
export declare const OrderService: {
    createOrder(data: Prisma.OrderUncheckedCreateInput): Promise<{
        product: {
            id: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            price: Prisma.Decimal;
            discountPrice: Prisma.Decimal | null;
            weight: string;
            stock: number;
            shippingFee: Prisma.Decimal;
            isActive: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal | null;
        orderId: string | null;
        customerName: string;
        phone: string | null;
        whatsapp: string | null;
        address: string | null;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal | null;
        total: Prisma.Decimal | null;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
    getAllOrders(page?: number, limit?: number, status?: string, search?: string, startDate?: string, endDate?: string, minAmount?: number, maxAmount?: number, sortBy?: string, sortOrder?: "asc" | "desc"): Promise<{
        orders: ({
            product: {
                id: string;
                image: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                slug: string;
                description: string | null;
                price: Prisma.Decimal;
                discountPrice: Prisma.Decimal | null;
                weight: string;
                stock: number;
                shippingFee: Prisma.Decimal;
                isActive: boolean;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shippingFee: Prisma.Decimal | null;
            orderId: string | null;
            customerName: string;
            phone: string | null;
            whatsapp: string | null;
            address: string | null;
            note: string | null;
            quantity: number;
            subtotal: Prisma.Decimal | null;
            total: Prisma.Decimal | null;
            paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
            status: import("@prisma/client").$Enums.OrderStatus;
            productId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getOrderById(id: string): Promise<({
        product: {
            id: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            price: Prisma.Decimal;
            discountPrice: Prisma.Decimal | null;
            weight: string;
            stock: number;
            shippingFee: Prisma.Decimal;
            isActive: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal | null;
        orderId: string | null;
        customerName: string;
        phone: string | null;
        whatsapp: string | null;
        address: string | null;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal | null;
        total: Prisma.Decimal | null;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }) | null>;
    updateOrderStatus(id: string, status: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal | null;
        orderId: string | null;
        customerName: string;
        phone: string | null;
        whatsapp: string | null;
        address: string | null;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal | null;
        total: Prisma.Decimal | null;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
    deleteOrder(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal | null;
        orderId: string | null;
        customerName: string;
        phone: string | null;
        whatsapp: string | null;
        address: string | null;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal | null;
        total: Prisma.Decimal | null;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map