"use client";

import Image from 'next/image';
import { Check, ShoppingCart, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import ScrollAnimate from './ScrollAnimate';

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
    <section className="bg-[#FAF7F2] w-full pt-0 md:pt-12 pb-12 md:pb-24 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <ScrollAnimate animation="animate__fadeInLeft" className="order-2 lg:order-1 space-y-6 md:space-y-8 relative z-10 lg:pl-8 xl:pl-12">

            {/* Mobile Order Button (Visible below banner on mobile/tablet) */}
            <div className="flex justify-center lg:hidden w-full">
              <button
                onClick={scrollToOrder}
                className="inline-flex items-center justify-center gap-2 bg-[#0D5C22] hover:bg-[#0B4A1C] text-white font-bold text-[16px] md:text-[18px] px-7 py-3 md:py-3.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 w-max"
              >
                <ShoppingCart className="w-5 h-5" />
                এখনই অর্ডার করুন
              </button>
            </div>

            {/* Main Title Area */}
            <div className="flex items-baseline gap-3 md:block space-y-0">
              <h3 className="text-[#1A6E36] text-4xl md:text-[50px] font-normal tracking-wide  leading-none   whitespace-nowrap">
                 মিশরী
              </h3>
              <h1
                className="text-[#0D5C22] text-[60px] sm:text-7xl md:text-[130px] lg:text-[100px] font-black  leading-none tracking-tighter drop-shadow-sm -ml-1.5 md:-ml-3 whitespace-nowrap"
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
              className="hidden lg:inline-flex items-center justify-center gap-2 bg-[#0D5C22] hover:bg-[#0B4A1C] text-white font-bold text-[16px] md:text-[18px] px-7 py-3 md:py-3.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 w-max"
            >
              <ShoppingCart className="w-5 h-5" />
              এখনই অর্ডার করুন
            </button>

            {/* Bottom Badges */}
            <div className="flex flex-wrap items-center gap-2.5 md:gap-3 pt-0 md:pt-4 w-full">
              <div className="flex-auto md:flex-none flex items-center justify-center md:justify-start gap-2 bg-[#F3EBE0] rounded-none px-3 py-2.5 md:py-2 shadow-xs">
                <ShieldCheck className="w-[18px] h-[18px] md:w-5 md:h-5 text-[#0D5C22] shrink-0" />
                <span className="text-[#2D251E] text-[15px] md:text-[16px] font-extrabold tracking-wide whitespace-nowrap">100% খাঁটি</span>
              </div>
              <div className="flex-auto md:flex-none flex items-center justify-center md:justify-start gap-2 bg-[#F3EBE0] rounded-none px-3 py-2.5 md:py-2 shadow-xs">
                <Sparkles className="w-[18px] h-[18px] md:w-5 md:h-5 text-[#0D5C22] shrink-0" />
                <span className="text-[#2D251E] text-[15px] md:text-[16px] font-extrabold tracking-wide whitespace-nowrap">হাইজেনিক প্যাকেজিং</span>
              </div>
              <div className="flex-auto md:flex-none flex items-center justify-center md:justify-start gap-2 bg-[#F3EBE0] rounded-none px-3 py-2.5 md:py-2 shadow-xs">
                <Truck className="w-[18px] h-[18px] md:w-5 md:h-5 text-[#0D5C22] shrink-0" />
                <span className="text-[#2D251E] text-[15px] md:text-[16px] font-extrabold tracking-wide whitespace-nowrap">দ্রুত ডেলিভারি</span>
              </div>
            </div>

          </ScrollAnimate>

          {/* Right Image */}
          <ScrollAnimate animation="animate__zoomIn" className="order-1 lg:order-2 relative flex justify-center lg:justify-end items-center w-full mt-4 md:mt-8 lg:mt-0 lg:pl-4">
            <div className="relative w-full max-w-[550px] xl:max-w-[650px] overflow-hidden rounded-xl md:rounded-2xl">
              <Image
                src="/banner-img/banner-image.jpg"
                alt="Premium Medjool Dates"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </section>
  );
}