"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useGetProductsQuery, useDeleteProductMutation } from "@/lib/feature/products/productsApi";

export default function ProductsPage() {
  const { data, isLoading } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const products = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await deleteProduct(id).unwrap();
      if (!res.success) {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#a46404]">Products</h1>
        <Link 
          href="/dashboard/products/create"
          className="bg-[#009e19] hover:bg-[#008014] text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#a46404]">All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-neutral-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">No products found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Image</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Title</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Price</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Discount</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Stock</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Shipping</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded bg-white border flex items-center justify-center overflow-hidden">
                          <img 
                            src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-banner.webp"} 
                            alt={product.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-neutral-800">{product.title}</td>
                      <td className="py-3 px-4 font-semibold text-[#009e19]">{Number(product.price).toLocaleString()}৳</td>
                      <td className="py-3 px-4 font-semibold text-orange-500">
                        {product.discountPrice ? `${Number(product.discountPrice).toLocaleString()}৳` : '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-600">{Number(product.shippingFee)}৳</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link 
                            href={`/dashboard/products/edit/${product.id}`}
                            className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
