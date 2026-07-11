"use client";

import Link from 'next/link';
import { Phone, ShoppingCart, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-[#FAF7F0] border-b border-[#E8DFD0] px-4 py-2.5 md:py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo / Brand Section */}
        <Link href="/" className="flex items-center gap-2.5 group select-none">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-[#C59B27] flex items-center justify-center bg-white shrink-0 overflow-hidden shadow-sm">
            <img
              src="/Arabian-Store-Logo-Wide.webp"
              alt="Arabian Store Logo"
              className="w-full h-full object-contain p-0.5"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-medium text-[#888] tracking-wide">মিডিয়াম</span>
            <span className="font-extrabold text-[18px] md:text-[20px] text-[#1a6b2a] leading-tight">মেডজুল</span>
          </div>
        </Link>

        {/* Action Controls Section */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Phone Number Call-out */}
          <a
            href="tel:09666767673"
            className="flex items-center gap-1.5 bg-white hover:bg-[#F3ECE0] transition-colors duration-200 rounded-full pl-2 pr-3.5 py-1.5 border border-[#E8DFD0] shadow-sm"
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#C59B27] flex items-center justify-center text-white shrink-0">
              <Phone className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
            </div>
            <span className="hidden sm:inline font-bold text-xs md:text-sm text-[#2D251E] tracking-wide">
              09666 767673
            </span>
          </a>

          {/* Order Button */}
          <Link
            href="#order"
            onClick={(e) => { e.preventDefault(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex items-center justify-center gap-1.5 bg-[#008013] hover:bg-[#006810] active:scale-95 text-white transition-all duration-200 rounded-full px-3 md:px-5 py-1.5 md:py-2 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
            <span className="font-bold text-xs md:text-sm tracking-wide whitespace-nowrap">
              অর্ডার করুন
            </span>
          </Link>

          {/* Hamburger - mobile only hint */}
          <button className="md:hidden p-1.5 text-[#2D251E]">
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </div>
    </header>
  );
}