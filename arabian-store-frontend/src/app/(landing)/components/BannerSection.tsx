"use client";

import { Check, ShoppingCart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function BannerSection() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuresColumn1 = [
    "বাছাইকৃত প্রিমিয়াম মান",
    "বড় ও মাংসল সাইজ",
    "নরম ও মিষ্টি",
  ];

  const featuresColumn2 = [
    "প্রাকৃতিক মিষ্টতা",
    "স্বাস্থ্যকর ও পুষ্টিকর",
    "সারা বাংলাদেশে হোম ডেলিভারি",
  ];

  return (
    <section className="bg-[#FAF7F2] w-full pb-16  md:pb-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 relative z-10 lg:pl-8 xl:pl-12">
            
            {/* Main Title Area */}
            <div className="space-y-0">
              <h3 className="text-[#1A6E36] text-2xl md:text-[28px] font-bold tracking-wide italic leading-none pl-1">
                মিডিয়াম
              </h3>
              <h1 className="text-[#0D5C22] text-7xl md:text-8xl lg:text-[110px] font-black leading-none tracking-tighter drop-shadow-sm -ml-1.5">
                মেডজুল
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-[#333333] text-lg md:text-xl lg:text-2xl font-bold tracking-wide max-w-xl">
              বাছাইকৃত প্রিমিয়াম মান, বড় ও মাংসল সাইজ, প্রাকৃতিক মিষ্টতা
            </p>

            {/* Features Checkmarks in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 pt-2 pb-4">
              <div className="space-y-4">
                {featuresColumn1.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1A6E36] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-[#4A4A4A] font-semibold text-[15px] md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {featuresColumn2.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1A6E36] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                    <span className="text-[#4A4A4A] font-semibold text-[15px] md:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={scrollToOrder}
              className="inline-flex items-center justify-center gap-2 bg-[#0F751E] hover:bg-[#0B5C17] text-white font-bold text-lg md:text-xl px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(15,117,30,0.39)] hover:shadow-[0_6px_20px_rgba(15,117,30,0.23)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingCart className="w-5 h-5" />
              এখনই অর্ডার করুন
            </button>

            {/* Bottom Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-[#F3EFE6] border border-[#E8DFCF] rounded-md px-3 py-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#1A6E36]" />
                <span className="text-[#333333] text-sm md:text-[15px] font-bold">100% খাঁটি</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3EFE6] border border-[#E8DFCF] rounded-md px-3 py-1.5 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#1A6E36]" />
                <span className="text-[#333333] text-sm md:text-[15px] font-bold">হাইজেনিক প্যাকেজিং</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3EFE6] border border-[#E8DFCF] rounded-md px-3 py-1.5 shadow-sm">
                <Truck className="w-4 h-4 text-[#1A6E36]" />
                <span className="text-[#333333] text-sm md:text-[15px] font-bold">দ্রুত ডেলিভারি</span>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end items-center w-full mt-8 lg:mt-0">
            <Image 
              src="/Untitled - July 11, 2026 at 16.40.12.png" 
              alt="Premium Medjool Dates"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}