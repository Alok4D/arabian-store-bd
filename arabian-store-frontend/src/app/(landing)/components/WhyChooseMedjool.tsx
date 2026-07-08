"use client";

import { Globe, Heart, Gift, Zap, Star, CheckCircle2 } from 'lucide-react';

export default function WhyChooseMedjool() {
  return (
    <div className="py-16 md:py-24 bg-white text-[#333]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 space-y-16">
        
        {/* Intro Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#a46404] mb-6 leading-tight">
            কেন হাজারো মানুষ মেডজুল খেজুর বেছে নিচ্ছেন?
          </h2>
          <p className="text-[18px] md:text-[22px] leading-relaxed text-neutral-700 font-medium" style={{ fontFamily: "'Boronomala', sans-serif" }}>
            মেডজুলকে পৃথিবীর অন্যতম জনপ্রিয় প্রিমিয়াম খেজুর হিসেবে ধরা হয়। এর বড় আকার, নরম ও মাংসল শাঁস এবং প্রাকৃতিক ক্যারামেলের মতো মিষ্টি স্বাদ একে আলাদা মর্যাদা দিয়েছে।<br className="hidden md:block" /> 
            <span className="text-[#009e19] font-bold mt-2 block">আজ বিশ্বের বিভিন্ন দেশে এটি শুধু একটি ফল নয়, বরং একটি Premium Healthy Snack হিসেবে পরিচিত।</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Global Popularity */}
          <div className="bg-[#fcf8f2] rounded-xl p-8 border border-[#faecd8] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#a46404] text-white p-3 rounded-lg">
                <Globe size={28} />
              </div>
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#a46404]">বিশ্বজুড়ে জনপ্রিয় কেন?</h3>
            </div>
            <ul className="space-y-5">
              {[
                "মধ্যপ্রাচ্যে অতিথি আপ্যায়নের অন্যতম সেরা খাবার",
                "ইউরোপ ও আমেরিকায় স্বাস্থ্যসচেতন মানুষের জনপ্রিয় স্ন্যাকস",
                "রমজান, ঈদ, আতিথিয়তা ও বিশেষ অনুষ্ঠানে প্রথম সারির উপহার",
                "জিমে যাওয়া, অফিসগামী এবং ব্যস্ত মানুষের প্রাকৃতিক এনার্জির উৎস"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-[#a46404] text-white rounded-full flex-shrink-0">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                  <span className="text-[18px] md:text-[20px] font-medium leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BD Popularity */}
          <div className="bg-[#f0fbf4] rounded-xl p-8 border border-[#d2edd9] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#009e19] text-white p-3 rounded-lg">
                <Star size={28} />
              </div>
              <h3 className="text-[24px] md:text-[28px] font-bold text-[#009e19]">বাংলাদেশেও কেন এত জনপ্রিয়?</h3>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "বড় ও আকর্ষণীয় আকার",
                "মুখে দিলেই নরম অনুভূতি",
                "অতিরিক্ত চিনি ছাড়াই প্রাকৃতিক মিষ্টতা",
                "অতিথি আপ্যায়নে প্রিমিয়াম অনুভূতি",
                "উপহার হিসেবে দারুণ মানানসই"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 bg-[#009e19] text-white rounded-full flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-[18px] md:text-[20px] font-medium leading-snug">{text}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-white p-5 rounded-lg border-l-4 border-[#009e19] shadow-sm">
              <p className="text-[16px] text-neutral-500 mb-1 font-bold">অনেকেই প্রথমবার খেয়ে বলেন—</p>
              <p className="text-[20px] md:text-[22px] font-bold text-[#a46404] italic">
                "এটা তো খেজুর নয়, যেন প্রাকৃতিক ক্যারামেল!"
              </p>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
