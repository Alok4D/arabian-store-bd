import type { OrderInput } from '../schemas/order.schema.js';
export declare const createOrder: (orderData: OrderInput) => Promise<{
    customerName: string;
    phoneNumber: string;
    whatsappNumber: string | null;
    district: string | null;
    fullAddress: string;
    packageType: string;
    paymentMethod: string;
    id: string;
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getOrders: () => Promise<{
    customerName: string;
    phoneNumber: string;
    whatsappNumber: string | null;
    district: string | null;
    fullAddress: string;
    packageType: string;
    paymentMethod: string;
    id: string;
    totalAmount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
//# sourceMappingURL=order.service.d.ts.map