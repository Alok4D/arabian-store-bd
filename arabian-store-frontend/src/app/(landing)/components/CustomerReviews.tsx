"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function CustomerReviews() {
  const reviews = [
    '/review-img/R-1.webp',
    '/review-img/R-2.webp',
    '/review-img/R-3.webp',
    '/review-img/R-4.webp',
    '/review-img/R-5.webp',
    '/review-img/R-6.webp',
    '/review-img/R-7.webp',
    '/review-img/R-8.webp',
    '/review-img/R-9.webp',
    '/review-img/R-10.webp',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const maxIndex = reviews.length - itemsPerView;
    if (maxIndex < 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [itemsPerView, reviews.length]);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);
  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="bg-[#F4F0E8] py-10 md:py-14 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-[22px] md:text-[30px] font-extrabold text-[#2D251E] mb-8">
          ━ কাস্টমার রিভিউ ━
        </h2>

        <div className="relative group">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 bg-white hover:bg-[#FAF7F0] p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-[#C59B27] border border-[#E8DFD0] transition-all ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
          >
            <ChevronLeft size={22} />
          </button>

          <div className="overflow-hidden px-1 py-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {reviews.map((imgSrc, index) => (
                <div key={index} className="flex-none px-2" style={{ width: `${100 / itemsPerView}%` }}>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-sm border border-[#E8DFD0] bg-white">
                    <Image src={imgSrc} alt={`Customer Review ${index + 1}`} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 bg-white hover:bg-[#FAF7F0] p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-[#C59B27] border border-[#E8DFD0] transition-all ${currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all ${currentIndex === idx ? 'w-6 h-2.5 bg-[#008013]' : 'w-2.5 h-2.5 bg-[#CCC] hover:bg-[#AAA]'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
