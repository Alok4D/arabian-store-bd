"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useCreateProductMutation } from "@/lib/feature/products/productsApi";
import Swal from 'sweetalert2';

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    discountPrice: "",
    weight: "1 KG",
    stock: "100"
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: formData.slug ? formData.slug : generateSlug(title) // Auto-generate slug if empty
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("slug", formData.slug || generateSlug(formData.title));
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      if (formData.discountPrice) {
        submitData.append("discountPrice", formData.discountPrice);
      }
      submitData.append("weight", formData.weight);
      submitData.append("stock", formData.stock);
      
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const data = await createProduct(submitData).unwrap();
      
      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Product created successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          router.push("/dashboard/products");
        });
      } else {
        Swal.fire('Error!', data.message || "Failed to create product", 'error');
      }
    } catch (error: any) {
      console.error("Create error:", error);
      Swal.fire('Error!', error?.data?.message || "Something went wrong", 'error');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#2D251E]">Product Information</CardTitle>
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
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
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
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013] bg-neutral-50"
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
                className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
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
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Discount Price (৳)</label>
                <input 
                  type="number" 
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="e.g. 1500"
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
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
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
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
                  className="w-full p-2.5 border rounded-md outline-none focus:border-[#008013]"
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
                disabled={isCreating}
                className={`px-6 py-2.5 bg-[#008013] text-white rounded-md font-medium hover:bg-[#008014] transition-colors flex items-center gap-2 ${isCreating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Save className="w-4 h-4" />
                {isCreating ? "Saving..." : "Save Product"}
              </button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
