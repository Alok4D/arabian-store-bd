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
            weight: string;
            stock: number;
            shippingFee: Prisma.Decimal;
            isActive: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal;
        orderId: string | null;
        customerName: string;
        phone: string;
        whatsapp: string | null;
        address: string;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal;
        total: Prisma.Decimal;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
    getAllOrders(): Promise<({
        product: {
            id: string;
            image: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            description: string | null;
            price: Prisma.Decimal;
            weight: string;
            stock: number;
            shippingFee: Prisma.Decimal;
            isActive: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal;
        orderId: string | null;
        customerName: string;
        phone: string;
        whatsapp: string | null;
        address: string;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal;
        total: Prisma.Decimal;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    })[]>;
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
            weight: string;
            stock: number;
            shippingFee: Prisma.Decimal;
            isActive: boolean;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal;
        orderId: string | null;
        customerName: string;
        phone: string;
        whatsapp: string | null;
        address: string;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal;
        total: Prisma.Decimal;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }) | null>;
    updateOrderStatus(id: string, status: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal;
        orderId: string | null;
        customerName: string;
        phone: string;
        whatsapp: string | null;
        address: string;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal;
        total: Prisma.Decimal;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
    deleteOrder(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shippingFee: Prisma.Decimal;
        orderId: string | null;
        customerName: string;
        phone: string;
        whatsapp: string | null;
        address: string;
        note: string | null;
        quantity: number;
        subtotal: Prisma.Decimal;
        total: Prisma.Decimal;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod;
        status: import("@prisma/client").$Enums.OrderStatus;
        productId: string | null;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map