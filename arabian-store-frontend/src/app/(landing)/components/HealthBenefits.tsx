"use client";

import { Activity, ShieldCheck, Zap, HeartPulse, Leaf } from 'lucide-react';

export default function HealthBenefits() {
  return (
    <div className="py-6 md:py-8 bg-[#e8f5ec] text-[#333]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-block bg-[#009e19] text-white p-2 rounded-full mb-3 shadow-sm">
            <HeartPulse size={28} />
          </div>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#009e19] mb-4">
            কেন প্রতিদিন মেডজুল খেতে পারেন?
          </h2>
          <p className="text-[20px] md:text-[22px] font-medium text-neutral-700">
            মেডজুল শুধু সুস্বাদুই নয়, এটি বিভিন্ন গুরুত্বপূর্ণ পুষ্টি উপাদানেরও উৎস।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Nutrition List */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 md:p-6 border border-neutral-100 shadow-sm">
            <h3 className="text-[20px] md:text-[22px] font-bold text-[#a46404] mb-4 border-b border-neutral-100 pb-3">
              এতে রয়েছে—
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "খাদ্যআঁশ (ফাইবার)",
                "প্রাকৃতিক কার্বোহাইড্রেট",
                "পটাশিয়াম",
                "ম্যাগনেশিয়াম",
                "কপার",
                "ম্যাঙ্গানিজ",
                "বিভিন্ন অ্যান্টিঅক্সিডেন্ট"
              ].map((item, idx, arr) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-2 bg-[#fcf8f2] p-2.5 rounded-lg border border-[#faecd8] ${
                    idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2' : ''
                  }`}
                >
                  <Leaf size={16} className="text-[#009e19] flex-shrink-0" />
                  <span className="font-semibold text-[15px] md:text-[17px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits List */}
          <div className="lg:col-span-7 bg-white rounded-xl p-5 md:p-6 border border-neutral-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e8f5ec] rounded-bl-full -z-10 opacity-50" />
            
            <h3 className="text-[20px] md:text-[22px] font-bold text-[#009e19] mb-4 border-b border-neutral-100 pb-3">
              নিয়মিত পরিমিত পরিমাণে খাওয়ার সম্ভাব্য উপকারিতা
            </h3>
            <ul className="space-y-3">
              {[
                { icon: <Zap size={22} />, text: "দ্রুত শক্তি পেতে সহায়তা করতে পারে" },
                { icon: <Activity size={22} />, text: "ফাইবার থাকায় হজমে সহায়ক হতে পারে" },
                { icon: <HeartPulse size={22} />, text: "পটাশিয়াম শরীরের স্বাভাবিক পেশী ও স্নায়ুর কার্যক্রমে ভূমিকা রাখে" },
                { icon: <ShieldCheck size={22} />, text: "অ্যান্টিঅক্সিডেন্ট কোষকে অক্সিডেটিভ ক্ষতি থেকে সুরক্ষায় সাহায্য করে" },
                { icon: <Leaf size={22} />, text: "ব্যস্ত জীবনে স্বাস্থ্যকর স্ন্যাকসের একটি ভালো বিকল্প" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 bg-[#f0fbf4] text-[#009e19] p-1.5 rounded-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[16px] md:text-[18px] font-medium leading-snug pt-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        {/* Medical Note */}
        <div className="mt-8 bg-white/60 border border-[#bce3c8] rounded-xl p-4 text-center max-w-4xl mx-auto backdrop-blur-sm">
          <p className="text-[15px] md:text-[17px] text-neutral-700 font-medium leading-relaxed">
            <span className="font-bold text-[#d14f2e]">দ্রষ্টব্য:</span> মেডজুলে প্রাকৃতিক চিনি থাকে। তাই যাদের ডায়াবেটিস বা বিশেষ স্বাস্থ্যগত সমস্যা রয়েছে, তারা চিকিৎসক বা পুষ্টিবিদের পরামর্শ অনুযায়ী পরিমাণ নির্ধারণ করবেন।
          </p>
        </div>

      </div>
    </div>
  );
}
