import { Prisma } from '@prisma/client';
export declare const ProductService: {
    createProduct(data: Prisma.ProductCreateInput): Promise<{
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
    }>;
    getAllProducts(): Promise<{
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
    }[]>;
    getProductById(id: string): Promise<{
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
    } | null>;
    updateProduct(id: string, data: Prisma.ProductUpdateInput): Promise<{
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
    }>;
    deleteProduct(id: string): Promise<{
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
    }>;
};
//# sourceMappingURL=product.service.d.ts.map