"use client";

import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProductLandingSection() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/products`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.filter((p: any) => p.isActive));
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef9f3] bg-gradient-to-br from-[#f5fbf7] via-[#eef9f3] to-[#e4f5eb] py-12 px-4 md:px-8 lg:px-16 text-[#333333]">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Top Header Banner */}
        <div className="w-full bg-[#E3FEEA] border border-[#d2edd9] rounded-md py-4 md:py-6 text-center px-3 shadow-sm">
          <h1 
            className="font-bold text-[#a46404] text-[22px] leading-[32px] md:text-[40px] md:leading-[60px] mb-1 md:mb-0"
          >
            মিশরীয় মেডজুল খেজুর
          </h1>
          <p 
            className="font-bold text-[#094166] text-[16px] leading-[24px] md:text-[26px] md:leading-[40px]" 
            style={{ fontFamily: "'Boronomala', sans-serif" }}
          >
            খেজুরের জগতে এক রাজকীয় অভিজ্ঞতা! প্রিমিয়াম কোয়ালিটি | নরম শাঁস | প্রাকৃতিক মিষ্টতা
          </p>
        </div>

        {/* Main Content Grid: Features & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          
          {/* Left Side: Features Lists */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 lg:pr-4">
            
            {/* Mobile CTA Button (Only visible on small screens) */}
            <div className="flex justify-center md:hidden pt-2 pb-2">
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#009e19] hover:bg-[#008a16] text-white font-bold text-[20px] px-10 py-2.5 rounded-md transition-all duration-200 shadow-md"
              >
                অর্ডার করুন
              </button>
            </div>

            {/* List 1: Product Features */}
            <div>
              <h2 className="text-[22px] leading-[32px] md:text-[36px] md:leading-[60px] font-bold text-[#a46404] mb-2 md:mb-2 text-center md:text-left">
                কেন খেজুর বাড়ি এর মেডজুল?
              </h2>
              <ul className="space-y-3">
                {[
                  "বাছাইকৃত প্রিমিয়াম মান",
                  "বড় ও সুন্দর সাইজ",
                  "নরম ও মাংসল শাঁস",
                  "প্রাকৃতিক মিষ্টতা",
                  "যত্নসহকারে প্যাকেজিং",
                  "সারা বাংলাদেশে হোম ডেলিভারি"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[18px] md:text-[20px] md:leading-[30px] font-normal text-black" style={{ fontFamily: "'Boronomala', sans-serif" }}>
                    <div className="bg-[#009e19] rounded-full w-[22px] h-[22px] flex items-center justify-center flex-shrink-0">
                      <Check className="h-[14px] w-[14px] text-white stroke-[4]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* List 2: Why Choose Us */}
            <div>
              <h2 className="text-[22px] leading-[32px] md:text-[36px] md:leading-[60px] font-bold text-[#a46404] mb-2 md:mb-2 text-center md:text-left">
                স্বাদ কেমন?
              </h2>
              <ul className="space-y-3">
                {[
                  "প্রাকৃতিক ক্যারামেলের মতো মিষ্টি",
                  "মোলায়েম ও নরম",
                  "কোনো কৃত্রিম মিষ্টতার অনুভূতি নেই",
                  "মুখে দিলেই ধীরে ধীরে গলে যাওয়ার মতো অনুভূতি"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[18px] md:text-[20px] md:leading-[30px] font-normal text-black" style={{ fontFamily: "'Boronomala', sans-serif" }}>
                    <div className="bg-[#009e19] rounded-full w-[22px] h-[22px] flex items-center justify-center flex-shrink-0">
                      <Check className="h-[14px] w-[14px] text-white stroke-[4]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop CTA Button (Hidden on small screens) */}
            <div className="hidden md:flex pt-4 justify-start">
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#009e19] hover:bg-[#008a16] text-white font-medium text-2xl px-12 py-3 rounded-md transition-all duration-200 transform hover:scale-105"
              >
                অর্ডার করুন
              </button>
            </div>
          </div>

          {/* Right Side: Showcase Product Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
           <img src="/banner-img/product-banner.webp" alt="Egyptian Medjool" className="w-full h-auto object-contain drop-shadow-xs" />
          </div>
        </div>

        {/* Pricing & Packaging Packages Block */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-4">
            {products.map((product) => (
              <div key={product.id} className="bg-[#f2fbf4] border border-[#d2edd9] rounded-md py-6 md:py-8 text-center px-3 md:px-4 shadow-sm text-[18px] md:text-[24px] md:leading-[36px] font-bold text-black" style={{ fontFamily: "'Boronomala', sans-serif" }}>
                <span className="block md:inline">
                  <span className="text-[#a46404]"></span> {product.title}
                </span>
                <span className="text-[#ff0000] block md:inline md:ml-1 mt-1 md:mt-0">{Number(product.price).toLocaleString('bn-BD')} টাকা</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}