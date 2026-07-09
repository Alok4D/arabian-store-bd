"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    weight: "",
    stock: "",
    shippingFee: ""
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/products/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const product = data.data;
          setFormData({
            title: product.title || "",
            slug: product.slug || "",
            description: product.description || "",
            price: product.price ? product.price.toString() : "",
            weight: product.weight || "",
            stock: product.stock ? product.stock.toString() : "",
            shippingFee: product.shippingFee ? product.shippingFee.toString() : ""
          });
          
          if (product.image) {
            setImagePreview(product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: formData.slug ? formData.slug : generateSlug(title)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("slug", formData.slug || generateSlug(formData.title));
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("weight", formData.weight);
      submitData.append("stock", formData.stock);
      submitData.append("shippingFee", formData.shippingFee);
      
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "PATCH",
        body: submitData
      });

      const data = await res.json();
      if (data.success) {
        router.push("/dashboard/products");
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="py-8 text-center text-neutral-500">Loading product details...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products"
          className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-neutral-600" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-[#a46404]">Edit Product</h1>
      </div>

      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#a46404]">Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Product Title <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. ১ কেজি মিসরীয় মেডজুল খেজুর"
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">URL Slug <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. 1kg-medjool"
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19] bg-neutral-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Write a short description..."
                className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Price (৳) <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1650"
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Stock Quantity <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="number" 
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Shipping Fee (৳) <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="number" 
                  name="shippingFee"
                  value={formData.shippingFee}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Weight Label <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 1 KG"
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#009e19]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Product Image</label>
              <div className="relative border-2 border-dashed border-neutral-200 rounded-lg p-6 flex flex-col items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer overflow-hidden group min-h-[160px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImageFile(file);
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20 pointer-events-none">
                      <span className="text-white font-medium flex items-center gap-2">
                        <UploadCloud className="w-5 h-5" /> Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100">
                      <UploadCloud className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="font-medium text-neutral-700">Add Image</div>
                    <div className="text-xs text-neutral-400">PNG, JPG, GIF up to 5MB</div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link 
                href="/dashboard/products"
                className="px-6 py-2.5 border rounded-md text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2.5 bg-[#009e19] text-white rounded-md font-medium hover:bg-[#008014] transition-colors flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Update Product"}
              </button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
