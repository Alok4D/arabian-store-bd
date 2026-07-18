"use client";

import React from 'react';

interface PackageSelectionProps {
  products: any[];
  selectedProduct: string;
  setSelectedProduct: (id: string) => void;
  quantities: Record<string, number>;
  handleQuantityChange: (id: string, delta: number) => void;
}

export default function PackageSelection({
  products,
  selectedProduct,
  setSelectedProduct,
  quantities,
  handleQuantityChange,
}: PackageSelectionProps) {
  return (
    <div className="mb-10 lg:mb-14">
      <h3 className="text-[18px] md:text-[20px] font-bold text-[#2D251E] mb-4">যেকোনো একটি প্যাকেজ নির্বাচন করুন</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {products.map((product) => {
          const isSelected = selectedProduct === product.id;
          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-5 cursor-pointer transition-all bg-white rounded-md border ${isSelected ? 'border-[#008013] shadow-[0_0_5px_rgba(0,128,19,0.3)]' : 'border-[#d1d5db] hover:border-[#008013]/50'}`}
            >
              {/* TODO: Uncomment when client confirms shipping details */}
              {Number(product.shippingFee) === 0 && (
                <div className="absolute right-0 top-0 bg-[#008013] text-white text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-bl-md shadow-sm z-10">
                  ফ্রি ডেলিভারি
                </div>
              )}
              
              {/* Radio */}
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#008013]' : 'border-[#9ca3af]'}`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-[#008013]" />}
              </div>
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 bg-white">
                <img
                  src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-bannerr.jpeg"}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Info */}
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <p className="font-bold text-[13px] sm:text-[14px] md:text-[15px] text-[#333] mb-0.5 md:mb-1 leading-snug truncate whitespace-normal line-clamp-2">{product.title}</p>
                <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#777] leading-tight line-clamp-2">{product.description || "বিশেষ ডিসকাউন্ট অফার"}</p>
              </div>

              {/* Qty + Price (Right Side) */}
              <div className="flex flex-col items-end justify-center gap-1.5 sm:gap-2 flex-shrink-0 z-10 relative pl-0 sm:pl-2">
                <div className="flex items-center border border-[#D5C9B8] rounded-md bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}
                    className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                  >−</button>
                  <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 border-x border-[#D5C9B8] text-[12px] sm:text-[14px] font-bold text-[#2D251E] min-w-[24px] sm:min-w-[32px] text-center">
                    {quantities[product.id] || 1}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}
                    className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                  >+</button>
                </div>
                {product.discountPrice ? (
                  <div className="flex flex-col items-end leading-none mt-1">
                    <span className="font-extrabold text-[14px] sm:text-[17px] md:text-[18px] text-[#1a6b2a] tracking-tight">{(Number(product.discountPrice) * (quantities[product.id] || 1)).toLocaleString()}৳</span>
                    <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">{(Number(product.price) * (quantities[product.id] || 1)).toLocaleString()}৳</span>
                  </div>
                ) : (
                  <span className="font-extrabold text-[14px] sm:text-[17px] md:text-[18px] text-[#1a6b2a] tracking-tight mt-1">{(Number(product.price) * (quantities[product.id] || 1)).toLocaleString()}৳</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
