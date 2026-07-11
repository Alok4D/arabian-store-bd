"use client";

import { Check } from 'lucide-react';

const benefits = [
  "হার্ট পালস বজায় রাখে",
  "হজম শক্তি বৃদ্ধি করে",
  "দ্রুত এনার্জি সরবরাহ করে",
  "হাড় মজবুত করে",
  "রক্তচাপ নিয়ন্ত্রণে সহায়তা করে",
  "ইমিউন সিস্টেম শক্তিশালী করে",
  "অ্যান্টিঅক্সিডেন্টে ভরপুর",
  "ডায়াবেটিস রোগীদের জন্য উপকারী (পরিমিত পরিমাণে)",
];

export default function HealthBenefits() {
  return (
    <section className="bg-[#FAF7F0] py-10 md:py-14 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-center text-[22px] md:text-[30px] font-extrabold text-[#2D251E] mb-8">
          ━ প্রিমিয়াম মেডজুল খেলে পাবেন যেসব উপকারিতা ━
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left: Benefits List */}
          <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6 md:p-8 shadow-sm">
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] md:text-[16px] text-[#2D251E] font-medium">
                  <div className="w-6 h-6 bg-[#008013] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-[#008013]/10 rounded-full blur-3xl scale-75"></div>
              <img
                src="/banner-img/product-bannerr.jpeg"
                alt="Medjool Dates Health Benefits"
                className="relative w-full rounded-2xl shadow-lg border border-[#E8DFD0] object-cover"
              />
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-[#FFF8E7] border border-[#F0DFA0] rounded-xl p-4 text-center">
          <p className="text-[13px] md:text-[14px] text-[#8B6914] font-medium">
            <span className="font-bold text-[#C59B27]">দ্রষ্টব্য:</span> মেডজুলে প্রাকৃতিক চিনি থাকে। যাদের ডায়াবেটিস বা বিশেষ স্বাস্থ্যগত সমস্যা রয়েছে, তারা চিকিৎসকের পরামর্শ অনুযায়ী পরিমাণ নির্ধারণ করবেন।
          </p>
        </div>

      </div>
    </section>
  );
}
