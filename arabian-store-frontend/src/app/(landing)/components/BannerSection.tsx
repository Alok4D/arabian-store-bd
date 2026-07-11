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
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8 relative z-10 lg:pl-8 xl:pl-12">

            {/* Main Title Area */}
            <div className="space-y-0">
              <h3 className="text-[#1A6E36] text-3xl md:text-[50px] font-normal tracking-wide italic leading-none pl-1 md:pl-2">
                মিডিয়াম
              </h3>
              <h1
                className="text-[#0D5C22] text-8xl md:text-[130px] lg:text-[120px] font-black italic leading-none tracking-tighter drop-shadow-sm -ml-1.5 md:-ml-3"
                style={{ WebkitTextStroke: '2px #0D5C22' }}
              >
                মেডজুল
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-[#2D251E] text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] font-bold tracking-wide max-w-lg mt-4">
              বাছাইকৃত প্রিমিয়াম মান, বড় ও মাংসল সাইজ, প্রাকৃতিক মিষ্টতা
            </p>

            {/* Features Checkmarks in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 pb-2">
              <div className="space-y-4">
                {featuresColumn1.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0F751E] flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-offset-1 ring-offset-[#FCF2E8] ring-[#C59B27]">
                      <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                    </div>
                    <span className="text-[#4A4A4A] font-bold text-[16px] md:text-[18px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {featuresColumn2.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#0F751E] flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-offset-1 ring-offset-[#FCF2E8] ring-[#C59B27]">
                      <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                    </div>
                    <span className="text-[#4A4A4A] font-bold text-[16px] md:text-[18px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={scrollToOrder}
              className="inline-flex items-center justify-center gap-2 bg-[#0D5C22] hover:bg-[#0B4A1C] text-white font-bold text-[16px] md:text-[18px] px-7 py-3 md:py-3.5 rounded-md transition-all duration-300  hover:-translate-y-0.5 active:translate-y-0 w-max"
            >
              <ShoppingCart className="w-5 h-5" />
              এখনই অর্ডার করুন
            </button>

            {/* Bottom Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <div className="flex items-center gap-2 bg-[#F3EBE0] rounded-none px-3 py-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#0D5C22]" />
                <span className="text-[#2D251E] text-[14px] md:text-[16px] font-extrabold tracking-wide">100% খাঁটি</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3EBE0] rounded-none px-3 py-2 shadow-xs">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#0D5C22]" />
                <span className="text-[#2D251E] text-[14px] md:text-[16px] font-extrabold tracking-wide">হাইজেনিক প্যাকেজিং</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F3EBE0] rounded-none px-3 py-2 shadow-xs">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-[#0D5C22]" />
                <span className="text-[#2D251E] text-[14px] md:text-[16px] font-extrabold tracking-wide">দ্রুত ডেলিভারি</span>
              </div>
            </div>

          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end items-center w-full mt-8 lg:mt-0">
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