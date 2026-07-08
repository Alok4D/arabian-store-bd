import { prisma } from '../config/prisma.js';
import { pricingMap } from '../utils/constants.js';
import type { OrderInput } from '../schemas/order.schema.js';

export const createOrder = async (orderData: OrderInput) => {
  const basePrice = pricingMap[orderData.packageType];
  if (basePrice === undefined) {
    throw new Error(`Invalid package type: ${orderData.packageType}`);
  }

  const quantity = orderData.quantity || 1;
  const deliveryCharge = 130;
  const totalAmount = (basePrice * quantity) + deliveryCharge;

  const newOrder = await prisma.order.create({
    data: {
      customerName: orderData.customerName,
      phoneNumber: orderData.phoneNumber,
      whatsappNumber: orderData.whatsappNumber ?? null,
      district: orderData.district ?? null,
      fullAddress: orderData.fullAddress,
      packageType: orderData.packageType,
      quantity,
      paymentMethod: orderData.paymentMethod,
      totalAmount,
      status: 'PENDING',
    },
  });

  return newOrder;
};

export const getOrders = async () => {
  return await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};
