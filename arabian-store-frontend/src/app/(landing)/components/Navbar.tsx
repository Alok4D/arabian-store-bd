"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  
  const scrollToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-[#FAF7F2] px-2 md:px-0 lg:px-0 py-4 md:py-6 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-8 lg:px-0">

        <Link href="/" className="flex items-center leading-none group select-none hover:opacity-90 transition-opacity">
          <Image src="/logo/updatednavlogo.png" alt="Arabian Store Logo" width={200} height={50} className="object-contain h-12 sm:h-16 md:h-20 w-auto" />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">

          <a
            href="tel:09666767673"
            className="hidden sm:flex items-center gap-3 text-[#2D251E] hover:text-[#1A6E36] transition-colors duration-200"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Image src="/call-icon.png" alt="Call" width={40} height={40} className="w-10 h-10 object-contain animate-zoomInOut" />
            </div>
            <span className="font-bold text-[18px] md:text-[20px] tracking-wide">
              09666 767673
            </span>
          </a>

          <a
            href="tel:09666767673"
            className="sm:hidden flex items-center justify-center w-10 h-10"
          >
            <Image src="/call-icon.png" alt="Call" width={40} height={40} className="w-10 h-10 object-contain animate-zoomInOut" />
          </a>

          {/* Order Button */}
          <button
            onClick={scrollToOrder}
            className="flex items-center justify-center gap-2 bg-[#1A6E36] hover:bg-[#145c2b] text-white transition-all duration-200 rounded-full px-4 py-2 sm:px-6 md:px-8 sm:py-2.5 md:py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="hidden sm:block w-5 h-5 shrink-0" />
            <span className="font-bold text-[14px] md:text-[16px] tracking-wide whitespace-nowrap">
              অর্ডার করুন
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}