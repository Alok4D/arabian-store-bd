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
    <header className="w-full bg-[#FAF7F2] px-2 md:px-0 lg:px-0 py-2 md:py-3 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2 md:px-8 lg:px-0">

        <Link href="/" className="flex items-center leading-none group select-none hover:opacity-90 transition-opacity">
          <Image src="/logo/navandfooterlogo.png" alt="Arabian Store Logo" width={200} height={50}
          priority={true}
          draggable={false}
          className="object-contain h-10 sm:h-12 md:h-14 w-auto" />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">

          <a
            href="tel:09666767673"
            className="hidden sm:flex items-center gap-3 text-[#2D251E] hover:text-[#1A6E36] transition-colors duration-200"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <Image src="/call-icon.png" alt="Call" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain animate-zoomInOut" />
            </div>
            <span className="font-bold text-[16px] md:text-[18px] tracking-wide">
              01817113624
            </span>
          </a>

          <a
            href="tel:09666767673"
            className="sm:hidden flex items-center justify-center w-8 h-8"
          >
            <Image src="/call-icon.png" alt="Call" width={32} height={32} className="w-8 h-8 object-contain animate-zoomInOut" />
          </a>

          {/* Order Button */}
          <button
            onClick={scrollToOrder}
            className="flex items-center justify-center gap-2 bg-[#1A6E36] hover:bg-[#145c2b] text-white transition-all duration-200 rounded-full px-4 py-2 md:px-6 md:py-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingCart className="hidden sm:block w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="font-bold text-[14px] md:text-[15px] tracking-wide whitespace-nowrap">
              অর্ডার করুন
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}