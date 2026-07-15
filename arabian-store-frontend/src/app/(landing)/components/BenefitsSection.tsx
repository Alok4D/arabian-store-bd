'use client';

import * as React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface BenefitItem {
  id: number;
  text: string;
}

const benefitsData: BenefitItem[] = [
  { id: 1, text: 'অনবদ্য শক্তি জোগায়' },
  { id: 2, text: 'হৃদযন্ত্র ভালো রাখতে সাহায্য করে' },
  { id: 3, text: 'পেটের সমস্যা দূর করতে সাহায্য করে' },
  { id: 4, text: 'আয়রন ও ক্যালসিয়ামের উৎস' },
  { id: 5, text: 'রোগ প্রতিরোধ ক্ষমতা বাড়ায়' },
  { id: 6, text: 'হাড় ও দাঁত শক্ত করে' },
  { id: 7, text: 'স্ট্রোকের ঝুঁকি কমায়' },
];

const slideImages = [
  "/benefits-Section-img/IMG-20260709-WA0006.jpg",
  "/benefits-Section-img/IMG-20260709-WA0007.jpg",
  "/benefits-Section-img/IMG-20260709-WA0008 (1).jpg",
  "/benefits-Section-img/IMG-20260709-WA0009.jpg",
];

export default function BenefitsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full bg-[#F4F0E8] py-8 md:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Benefits Content */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          {/* Main Title Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#004D0B] leading-tight mb-8 text-left">
            প্রতিদিন মেডজুল খেলে <br className="hidden sm:inline" />
            পাবেন যেসব উপকারিতা
          </h2>

          {/* Benefits Bullet List */}
          <ul className="space-y-4">
            {benefitsData.map((benefit) => (
              <li 
                key={benefit.id} 
                className="flex items-start gap-3 group"
              >
                {/* Custom Solid Green Check Icon matching image design */}
                <div className="mt-1 shrink-0 bg-[#008013] text-white rounded-full p-0.5 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 fill-current text-[#008013]" />
                </div>
                
                {/* Benefit Copy Text */}
                <span className="text-[17px] sm:text-[20px] md:text-[22px] font-semibold text-[#2D251E] group-hover:text-[#008013] transition-colors duration-150">
                  {benefit.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Product Visual Element */}
        <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 select-none relative mt-0 lg:mt-0 w-full">
          <div className="w-full relative transition-transform duration-300">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-0">
                {slideImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-0">
                    <div className="w-full flex justify-center">
                      <Image
                        src={src}
                        alt={`Benefit Slide ${index + 1}`}
                        width={800}
                        height={800}
                        className="w-full h-auto object-contain rounded-xl"
                        priority={index === 0}
                        draggable={false}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      current === index 
                        ? "bg-[#008013] w-6" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </div>

      </div>
    </section>
  );
}