"use client";

import Link from 'next/link';
import { Phone, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-[#FAF7F2] px-4 py-4 md:py-6 relative z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-2 md:px-8 lg:px-12">

        {/* Logo / Brand Section */}
        <Link href="/" className="flex flex-col leading-none group select-none hover:opacity-90 transition-opacity">
          <span className="text-[#1A6E36] text-[12px] md:text-[14px] font-bold tracking-wide mb-0.5">
            মিডিয়াম
          </span>
          <span className="font-extrabold text-[24px] md:text-[28px] lg:text-[32px] text-[#0D5C22] leading-none tracking-tight">
            মেডজুল
          </span>
        </Link>

        {/* Action Controls Section */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* Phone Number Call-out */}
          <a
            href="tel:09666767673"
            className="hidden sm:flex items-center gap-2.5 bg-[#F3EFE6] hover:bg-[#EAE4D5] transition-colors duration-200 rounded-full px-4 py-2 border border-[#E8DFCF] shadow-sm"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#1A6E36]">
              <Phone className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-[15px] md:text-[17px] text-[#2D251E] tracking-wide">
              09666 767673
            </span>
          </a>

          {/* Phone Mobile Only Icon */}
          <a
            href="tel:09666767673"
            className="sm:hidden flex items-center justify-center w-10 h-10 bg-[#F3EFE6] rounded-full border border-[#E8DFCF] shadow-sm text-[#1A6E36]"
          >
            <Phone className="w-4 h-4 fill-current" />
          </a>

          {/* Order Button */}
          <button
            onClick={scrollToOrder}
            className="flex items-center justify-center gap-2 bg-[#0F751E] hover:bg-[#0B5C17] text-white transition-all duration-200 rounded-full px-5 md:px-7 py-2.5 md:py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="font-bold text-[14px] md:text-[16px] tracking-wide whitespace-nowrap">
              অর্ডার করুন
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}