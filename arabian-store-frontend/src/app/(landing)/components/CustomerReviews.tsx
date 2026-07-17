"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ScrollAnimate from './ScrollAnimate';

export function CustomerReviews() {

  const reviews = [
    '/review-img/1 (1).jpg',
    '/review-img/1 (2).jpg',
    '/review-img/1 (3).jpg',
    '/review-img/1 (4).jpg',
    '/review-img/1 (5).jpg',
    '/review-img/1 (6).jpg',
    '/review-img/1 (7).jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="bg-[#F4F0E8] py-10 md:py-14 px-4 md:px-6 lg:px-0">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Decorative Green Lines */}
        <ScrollAnimate animation="animate__fadeInDown" className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-extrabold text-[#1A1A1A] text-center tracking-wide px-2">
            কাস্টমার রিভিউ
          </h2>
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-l from-transparent to-[#008013]" />
        </ScrollAnimate>

        <ScrollAnimate animation="animate__fadeInUp">
          <div className="relative group">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#008013] to-[#00660F] hover:from-[#00660F] hover:to-[#004D0B] p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-white transition-all active:scale-95 ${currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
            >
              <ChevronLeft size={22} />
            </button>

            <div 
              className="overflow-hidden px-0 py-2 touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
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
              className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 bg-gradient-to-b from-[#008013] to-[#00660F] hover:from-[#00660F] hover:to-[#004D0B] p-2.5 rounded-full shadow-md z-10 flex items-center justify-center text-white transition-all active:scale-95 ${currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
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
        </ScrollAnimate>

      </div>
    </section>
  );
}
