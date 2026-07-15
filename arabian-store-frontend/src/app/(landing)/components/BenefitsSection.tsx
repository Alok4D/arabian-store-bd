'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

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

export default function BenefitsSection() {
  return (
    <section className="w-full bg-[#F4F0E8] py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: Benefits Content */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          {/* Main Title Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#004D0B] leading-tight mb-8 text-left">
            প্রতিদিন মেদজুল খেলে <br className="hidden sm:inline" />
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
        <div className="lg:col-span-6 flex justify-center items-center order-1 lg:order-2 select-none relative w-full mt-0 lg:mt-0">
          <div className="w-full relative scale-100 sm:scale-110 md:scale-125 transition-transform duration-300">
            <Image
              src="/khejur.png"
              alt="Medjool Dates Bowl With Benefits"
              width={800}
              height={800}
              className="w-full h-[450px] object-contain"
              priority
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}