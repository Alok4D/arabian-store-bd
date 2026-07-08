import type { OrderInput } from '../schemas/order.schema.js';
export declare const createOrder: (orderData: OrderInput) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerName: string;
    phoneNumber: string;
    whatsappNumber: string | null;
    district: string | null;
    fullAddress: string;
    packageType: string;
    paymentMethod: string;
    totalAmount: number;
    status: string;
}>;
export declare const getOrders: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerName: string;
    phoneNumber: string;
    whatsappNumber: string | null;
    district: string | null;
    fullAddress: string;
    packageType: string;
    paymentMethod: string;
    totalAmount: number;
    status: string;
}[]>;
//# sourceMappingURL=order.service.d.ts.map