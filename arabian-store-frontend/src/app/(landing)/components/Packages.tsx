'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface PackageItem {
  id: number;
  weight: string;
  title: string;
  imageUrl: string;
  price: string;
  isPopular?: boolean;
}

const packagesData: PackageItem[] = [
  {
    id: 1,
    weight: '১ কেজি',
    title: 'প্রিমিয়াম মেদজুল খেজুর',
    imageUrl: '/product-logo.png',
    price: '১,৬৫০',
  },
  {
    id: 2,
    weight: '২ কেজি',
    title: 'প্রিমিয়াম মেদজুল খেজুর',
    imageUrl: '/product-logo.png',
    price: '৩,২০০',
  },
  {
    id: 3,
    weight: '৫ কেজি',
    title: 'প্রিমিয়াম মেদজুল খেজুর',
    imageUrl: '/product-logo.png',
    price: '৭,৫০০',
    isPopular: true,
  },
  {
    id: 4,
    weight: '৩ কেজি',
    title: 'প্রিমিয়াম মেদজুল খেজুর',
    imageUrl: '/product-logo.png',
    price: '৪,৫০০',
  },
];

export default function Packages() {
  return (
    <section className="w-full bg-[#FAF7F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Decorative Green Lines */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="hidden sm:block h-[1px] w-24 bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D251E] text-center tracking-wide">
            আমাদের প্যাকেজ সমূহ
          </h2>
          <div className="hidden sm:block h-[1px] w-24 bg-gradient-to-l from-transparent to-[#008013]" />
        </div>

        {/* Dynamic Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packagesData.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between items-center bg-white rounded-xl p-6 transition-all duration-300 shadow-sm ${
                item.isPopular
                  ? 'border-2 border-[#008013] scale-100 lg:scale-[1.03] shadow-md z-10'
                  : 'border border-[#EAE6DF] hover:shadow-md'
              }`}
            >
              {/* "Best Offer" Tag (সেরা অফার) */}
              {item.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00520C] text-white text-xs font-semibold px-4 py-1 rounded-full border border-[#008013] shadow-sm tracking-wide whitespace-nowrap">
                  সেরা অফার
                </div>
              )}

              {/* Package Details Content */}
              <div className="w-full flex flex-col items-center text-center">
                {/* Weight Variant Label */}
                <span className="text-xl font-bold text-[#008013] mb-1">
                  {item.weight}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-medium text-[#6B5E53] mb-4">
                  {item.title}
                </h3>

                {/* Product Image Display Area */}
                <div className="relative w-full h-32 my-2 flex items-center justify-center select-none">
                  {/* Swap with next/image or fallback HTML img according to your setup */}
                  <div className="w-full h-full relative">
                    <img
                      src={item.imageUrl}
                      alt={item.weight}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Pricing Block */}
                <div className="mt-4 mb-5 flex items-center justify-center text-[#008013] font-bold text-2xl">
                  <span className="mr-1 text-xl font-medium">৳</span>
                  <span>{item.price}</span>
                </div>
              </div>

              {/* CTA Interactive Action Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#008013] to-[#00660F] hover:from-[#00660F] hover:to-[#004D0B] active:scale-95 text-white font-medium rounded-full py-2.5 transition-all duration-200 group shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wide">অর্ডার করুন</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}