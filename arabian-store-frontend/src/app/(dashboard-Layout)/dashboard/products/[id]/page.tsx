"use client";

import { use } from "react";
import { useGetProductByIdQuery } from "@/lib/feature/products/productsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: productData, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className="py-8 text-center text-neutral-500">Loading product details...</div>;
  }

  if (!productData?.success || !productData?.data) {
    return <div className="py-8 text-center text-red-500">Failed to load product details.</div>;
  }

  const product = productData.data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/products"
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-[#2D251E]">Product Details</h1>
        </div>
        <Link 
          href={`/dashboard/products/edit/${id}`}
          className="bg-[#008013] hover:bg-[#008014] text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Card */}
        <Card className="border-[#faecd8] md:col-span-1">
          <CardContent className="p-4">
            <div className="w-full aspect-square rounded-lg border flex items-center justify-center overflow-hidden bg-white">
              <img 
                src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-banner.webp"} 
                alt={product.title} 
                className="w-full h-full object-contain" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="border-[#faecd8] md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-[#2D251E]">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-neutral-500">Price</p>
                <p className="text-lg font-medium text-[#008013]">{Number(product.price).toLocaleString()}৳</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-500">Discount Price</p>
                <p className="text-lg font-medium text-orange-500">
                  {product.discountPrice ? `${Number(product.discountPrice).toLocaleString()}৳` : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-500">Stock Status</p>
                <span className={`px-2 py-1 inline-block mt-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-500">Shipping Fee</p>
                <p className="text-neutral-800">{Number(product.shippingFee)}৳</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-500">Weight</p>
                <p className="text-neutral-800">{product.weight}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-500">Slug</p>
                <p className="text-neutral-800 text-sm break-all">{product.slug}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-100">
              <p className="text-sm font-semibold text-neutral-500 mb-2">Description</p>
              <p className="text-neutral-700 whitespace-pre-wrap">{product.description || "No description provided."}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}