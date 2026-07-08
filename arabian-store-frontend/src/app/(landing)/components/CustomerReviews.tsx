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

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    // Initial check
    handleResize(); 
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    const maxIndex = reviews.length - itemsPerView;
    if (maxIndex < 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval);
  }, [itemsPerView, reviews.length]);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="py-16 bg-[#E8FDF2] w-full mt-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-0 max-w-7xl relative">
        <h2 
          className="text-[28px] md:text-[36px] md:leading-[36px] font-bold text-center text-black mb-10"
          style={{ fontFamily: "'Noto Serif Bengali', sans-serif" }}
        >
          গ্রাহকদের অনুভূতি
        </h2>
        
        <div className="relative group">
          
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-orange-500 transition-all cursor-pointer ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="overflow-hidden px-2 py-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {reviews.map((imgSrc, index) => (
                <div 
                  key={index} 
                  className="flex-none px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="relative aspect-square w-full rounded-sm overflow-hidden shadow-sm">
                    <Image src={imgSrc} alt={`Customer Review ${index + 1}`} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-orange-500 transition-all cursor-pointer ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all ${currentIndex === idx ? 'w-2.5 h-2.5 bg-neutral-800' : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
