import { z } from 'zod';
export declare const orderSchema: z.ZodObject<{
    customerName: z.ZodString;
    phoneNumber: z.ZodString;
    whatsappNumber: z.ZodOptional<z.ZodString>;
    district: z.ZodOptional<z.ZodString>;
    fullAddress: z.ZodString;
    packageType: z.ZodEnum<{
        "1kg": "1kg";
        "2kg": "2kg";
        "3kg": "3kg";
        "5kg": "5kg";
        combo1: "combo1";
        combo2: "combo2";
    }>;
    paymentMethod: z.ZodDefault<z.ZodEnum<{
        COD: "COD";
        BKASH: "BKASH";
    }>>;
    quantity: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type OrderInput = z.infer<typeof orderSchema>;
//# sourceMappingURL=order.schema.d.ts.map