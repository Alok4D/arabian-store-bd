'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import ScrollAnimate from './ScrollAnimate';
import { useGetProductsQuery } from '@/lib/feature/products/productsApi';
import { Skeleton } from '@/components/ui/skeleton';

interface ApiProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  price: string;
  discountPrice: string | null;
  weight: string;
  stock: number;
  shippingFee: string;
  isActive: boolean;
}

const engToBng = (str: string) => {
  if (!str) return '';
  const bngDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/\d/g, (d) => bngDigits[parseInt(d, 10)]);
};

const formatPrice = (price: string) => {
  const num = parseInt(price, 10);
  if (isNaN(num)) return engToBng(price);
  return engToBng(num.toLocaleString('en-IN'));
};

const formatWeight = (weight: string) => {
  return engToBng(weight).replace(/KG/i, 'কেজি').trim();
};

export default function Packages() {
  
  const [products, setProducts] = useState<ApiProduct[]>([]);

  const { data: productsData, isLoading, isError } = useGetProductsQuery({});
  
  useEffect(() => {
    if (productsData?.success && productsData?.data) {
      const apiProducts: ApiProduct[] = productsData.data;
      
      const desiredOrder = ['1 KG', '2 KG', '3 KG', '5 KG'];
      const matchedProducts = desiredOrder
        .map(weight => apiProducts.find((p: ApiProduct) => p.weight === weight))
        .filter(Boolean) as ApiProduct[];

      setProducts(matchedProducts.length > 0 ? matchedProducts : apiProducts.slice(0, 4));
    }
  }, [productsData]);

  const handleOrderClick = (productId: string) => {
    // Scroll to the checkout section
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    // Dispatch custom event to select this package
    window.dispatchEvent(new CustomEvent('selectPackage', { detail: productId }));
  };

  return (
    <section className="w-full bg-[#FAF7F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Decorative Green Lines */}
        <ScrollAnimate animation="animate__fadeInDown" className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-extrabold text-[#1A1A1A] text-center tracking-wide px-2">
            আমাদের প্যাকেজ সমূহ
          </h2>
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-l from-transparent to-[#008013]" />
        </ScrollAnimate>

        {/* Dynamic Responsive Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-6 items-stretch px-1 sm:px-0 mt-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-between items-center bg-white rounded-xl p-3 sm:p-6 transition-all duration-300 shadow-sm border border-[#EAE6DF]"
              >
                <div className="w-full flex flex-col items-center text-center">
                  <Skeleton className="h-5 sm:h-7 w-16 mb-1 rounded-md" />
                  <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 mb-2 sm:mb-4 rounded-md" />
                  <Skeleton className="w-full h-16 sm:h-24 md:h-32 my-2 rounded-xl" />
                  <Skeleton className="h-6 sm:h-8 w-20 sm:w-24 mt-2 sm:mt-4 mb-3 sm:mb-5 rounded-md" />
                </div>
                <Skeleton className="w-full h-8 sm:h-10 rounded-full" />
              </div>
            ))
          ) : (
            products.map((item) => {
              const isPopular = item.weight === '5 KG';
              const displayPrice = item.discountPrice ? item.discountPrice : item.price;

              return (
                <ScrollAnimate 
                  key={item.id} 
                  animation="animate__fadeInUp"
                  className={`relative flex flex-col justify-between items-center bg-white rounded-xl p-3 sm:p-6 transition-all duration-300 shadow-sm ${
                    isPopular
                      ? 'ring-[1.5px] sm:ring-2 ring-[#008013] ring-inset border border-transparent scale-100 lg:scale-[1.03] shadow-md z-10'
                      : 'border border-[#EAE6DF] hover:shadow-md'
                  }`}
                >
                  {/* "Best Offer" Tag (সেরা অফার) */}
                  {isPopular && (
                    <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 bg-[#00520C] text-white text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border border-[#008013] shadow-sm tracking-wide whitespace-nowrap">
                      সেরা অফার
                    </div>
                  )}

                  {/* Package Details Content */}
                  <div className="w-full flex flex-col items-center text-center">
                    {/* Weight Variant Label */}
                    <span className="text-[15px] sm:text-xl font-bold text-[#008013] mb-1">
                      {formatWeight(item.weight)}
                    </span>

                    {/* Title */}
                    <h3 className="text-[11px] sm:text-sm md:text-base font-medium text-[#6B5E53] mb-2 sm:mb-4 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Product Image Display Area */}
                    <div className="relative w-full h-16 sm:h-24 md:h-32 my-2 flex items-center justify-center select-none">
                      {/* Swap with next/image or fallback HTML img according to your setup */}
                      <div className="w-full h-full relative">
                        <img
                          src={item.image}
                          alt={item.weight}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Pricing Block */}
                    <div className="mt-2 sm:mt-4 mb-3 sm:mb-5 flex items-center justify-center text-[#008013] font-bold text-lg sm:text-2xl">
                      <span className="mr-0.5 sm:mr-1 text-sm sm:text-xl font-medium">৳</span>
                      <span>{formatPrice(displayPrice)}</span>
                    </div>
                  </div>

                  {/* CTA Interactive Action Button */}
                  <button
                    type="button"
                    onClick={() => handleOrderClick(item.id)}
                    className="w-full flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-b from-[#008013] to-[#00660F] hover:from-[#00660F] hover:to-[#004D0B] active:scale-95 text-white font-medium rounded-full py-1.5 sm:py-2.5 transition-all duration-200 group shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] sm:text-sm tracking-wide">অর্ডার করুন</span>
                  </button>

                </ScrollAnimate>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}