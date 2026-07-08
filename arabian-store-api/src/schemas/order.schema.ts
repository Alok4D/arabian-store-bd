import { z } from 'zod';

export const orderSchema = z.object({
  customerName: z.string().min(2, "Name is too short"),
  phoneNumber: z.string().min(11, "Valid phone number is required"),
  whatsappNumber: z.string().optional(),
  district: z.string().optional(),
  fullAddress: z.string().min(5, "Address is required"),
  packageType: z.enum(['1kg', '2kg', '3kg', '5kg', 'combo1', 'combo2']),
  paymentMethod: z.enum(['COD', 'BKASH']).default('COD'),
  quantity: z.number().int().min(1).default(1),
});

export type OrderInput = z.infer<typeof orderSchema>;
