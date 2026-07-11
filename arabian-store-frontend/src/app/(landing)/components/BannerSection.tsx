"use client";

import { Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BannerSection() {

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    "/banner-img/WhatsApp Image 2026-07-09 at 4.01.12 PM.jpeg",
    "/banner-img/WhatsApp Image 2026-07-09 at 4.01.11 PM.jpeg",
    "/banner-img/WhatsApp Image 2026-07-09 at 4.01.10 PM.jpeg",
    "/banner-img/product-bannerr.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustBadges = [
    { icon: <ShieldCheck className="w-4 h-4 text-[#008013]" />, label: "১০০% খাঁটি" },
    { icon: <Truck className="w-4 h-4 text-[#008013]" />, label: "হোম ডেলিভারি" },
    { icon: <RefreshCw className="w-4 h-4 text-[#008013]" />, label: "রিটার্ন পলিসি" },
  ];

  const features = [
    "বাছাইকৃত প্রিমিয়াম মান",
    "বড় ও সুন্দর সাইজ",
    "নরম ও মাংসল শাঁস",
    "প্রাকৃতিক মিষ্টতা",
    "যত্নসহকারে প্যাকেজিং",
    "সারা বাংলাদেশে হোম ডেলিভারি"
  ];

  return (
    <section className="bg-[#FAF7F0] py-6 md:py-10 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Hero Grid: Left Info + Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT: Product Info */}
          <div className="space-y-5">
            {/* Tag */}
            <div className="inline-block">
              <span className="text-xs font-bold text-[#C59B27] tracking-widest uppercase bg-[#FFF8E7] border border-[#E8D5A0] px-3 py-1 rounded-full">
                মিডিয়াম
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="font-extrabold text-[40px] md:text-[56px] leading-tight text-[#1a6b2a]">
                মেডজুল
              </h1>
              <p className="text-[#555] text-base md:text-lg font-medium mt-2 leading-relaxed">
                মিশরীয় প্রিমিয়াম মান, বড় ও মাংসল আকার, প্রাকৃতিক মিষ্টতা
              </p>
            </div>

            {/* Feature Checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {features.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[15px] text-[#2D251E] font-medium">
                  <div className="w-5 h-5 bg-[#008013] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={scrollToOrder}
              className="inline-flex items-center gap-2 bg-[#008013] hover:bg-[#006810] text-white font-bold text-lg px-8 py-3.5 rounded-md transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              ✅ এখনই অর্ডার করুন
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-2">
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white border border-[#E8DFD0] rounded-full px-3 py-1.5 shadow-xs">
                  {b.icon}
                  <span className="text-[13px] font-semibold text-[#444]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Image Slider */}
          <div className="relative flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-2xl shadow-xl border border-[#E8DFD0] bg-white">
              {bannerImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Medjool Dates ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                />
              ))}
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-4">
              {bannerImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`rounded-full transition-all ${i === currentSlide ? "w-6 h-2.5 bg-[#008013]" : "w-2.5 h-2.5 bg-[#CCC]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className="mt-12">
          <h2 className="text-center text-[24px] md:text-[30px] font-extrabold text-[#2D251E] mb-6">
            ━ আমাদের প্যাকেজ সমূহ ━
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white border border-[#E8DFD0] rounded-xl h-44"></div>
              ))}
            </div>
          ) : products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product, idx) => {
                const isPopular = idx === 2;
                return (
                  <div
                    key={product.id}
                    onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`relative flex flex-col items-center text-center bg-white rounded-xl border-2 p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${isPopular ? 'border-[#C59B27] shadow-md' : 'border-[#E8DFD0]'}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C59B27] text-white text-[11px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow">
                        সবচেয়ে জনপ্রিয়
                      </div>
                    )}
                    <div className="w-16 h-16 rounded-lg overflow-hidden mb-3 border border-[#E8DFD0]">
                      <img
                        src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-bannerr.jpeg"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-[13px] md:text-[14px] text-[#2D251E] leading-snug mb-2">{product.title}</p>
                    <p className="font-extrabold text-[20px] md:text-[22px] text-[#1a6b2a]">
                      ৳{Number(product.price).toLocaleString('bn-BD')}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="mt-3 w-full bg-[#008013] hover:bg-[#006810] text-white text-[12px] md:text-[13px] font-bold py-1.5 rounded-md transition-colors"
                    >
                      অর্ডার করুন
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}