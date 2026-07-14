'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

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

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow' as RequestRedirect
    };

    fetch("http://localhost:5000/api/products", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.data) {
          const apiProducts: ApiProduct[] = result.data;
          
          // The original UI design strictly requires 4 items in this exact order: 1kg, 2kg, 5kg, 3kg.
          // We map the API data to match this layout perfectly.
          const desiredOrder = ['1 KG', '2 KG', '5 KG', '3 KG'];
          const matchedProducts = desiredOrder
            .map(weight => apiProducts.find(p => p.weight === weight))
            .filter(Boolean) as ApiProduct[];

          // Fallback to the first 4 items if none match the desired weights
          setProducts(matchedProducts.length > 0 ? matchedProducts : apiProducts.slice(0, 4));
        }
      })
      .catch((error) => console.error(error));
  }, []);

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
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-extrabold text-[#1A1A1A] text-center tracking-wide px-2">
            আমাদের প্যাকেজ সমূহ
          </h2>
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-l from-transparent to-[#008013]" />
        </div>

        {/* Dynamic Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {products.map((item) => {
            const isPopular = item.weight === '5 KG';
            const displayPrice = item.discountPrice ? item.discountPrice : item.price;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between items-center bg-white rounded-xl p-6 transition-all duration-300 shadow-sm ${
                  isPopular
                    ? 'ring-2 ring-[#008013] ring-inset border border-transparent scale-100 lg:scale-[1.03] shadow-md z-10'
                    : 'border border-[#EAE6DF] hover:shadow-md'
                }`}
              >
                {/* "Best Offer" Tag (সেরা অফার) */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00520C] text-white text-xs font-semibold px-4 py-1 rounded-full border border-[#008013] shadow-sm tracking-wide whitespace-nowrap">
                    সেরা অফার
                  </div>
                )}

                {/* Package Details Content */}
                <div className="w-full flex flex-col items-center text-center">
                  {/* Weight Variant Label */}
                  <span className="text-xl font-bold text-[#008013] mb-1">
                    {formatWeight(item.weight)}
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
                        src={item.image}
                        alt={item.weight}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Pricing Block */}
                  <div className="mt-4 mb-5 flex items-center justify-center text-[#008013] font-bold text-2xl">
                    <span className="mr-1 text-xl font-medium">৳</span>
                    <span>{formatPrice(displayPrice)}</span>
                  </div>
                </div>

                {/* CTA Interactive Action Button */}
                <button
                  type="button"
                  onClick={() => handleOrderClick(item.id)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#008013] to-[#00660F] hover:from-[#00660F] hover:to-[#004D0B] active:scale-95 text-white font-medium rounded-full py-2.5 transition-all duration-200 group shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
                  <span className="text-sm tracking-wide">অর্ডার করুন</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}