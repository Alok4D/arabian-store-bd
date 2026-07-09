import { prisma } from '../../config/prisma.js';
import { Prisma } from '@prisma/client';

export const ProductService = {
  async createProduct(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  },

  async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getProductById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  async updateProduct(id: string, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  },
};
