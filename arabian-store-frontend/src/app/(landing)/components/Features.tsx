'use client';

import { Check } from 'lucide-react';

export function Features() {
  return (
    <div className="flex-1 space-y-10 lg:pl-10">
      {/* Features List 1 */}
      <div>
        <h2 className="text-[26px] font-extrabold text-[#b86b11] mb-6">
          মিশরীয় মেডজুল দেখতে কেমন?
        </h2>
        <ul className="space-y-4">
          {[
            'আকারে সাধারণ খেজুরের তুলনায় অনেক বড়',
            'গাঢ় বাদামি থেকে হালকা অ্যাম্বার রঙ',
            'মোটা ও মাংসল শাঁস',
            'নরম, কোমল ও রসাল টেক্সচার',
            'প্রাকৃতিক উজ্জ্বলতা'
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] shrink-0 bg-[#00a82d] text-white rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5" strokeWidth={4} />
              </div>
              <span className="text-[#111111] font-semibold text-[17px] leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Features List 2 */}
      <div>
        <h2 className="text-[26px] font-extrabold text-[#b86b11] mb-6">
          কেন প্রতিদিন মেডজুল খেতে পারেন?
        </h2>
        <ul className="space-y-4">
          {[
            'দ্রুত শক্তি পেতে সহায়তা করতে পারে',
            'ফাইবার থাকায় হজমে সহায়ক হতে পারে',
            'পটাশিয়াম শরীরের স্বাভাবিক পেশী ও স্নায়ুর কার্যক্রমে ভূমিকা রাখে',
            'অ্যান্টিঅক্সিডেন্ট কোষকে অক্সিডেটিভ ক্ষতি থেকে সুরক্ষায় সাহায্য করে',
            'ব্যস্ত জীবনে স্বাস্থ্যকর স্ন্যাকসের একটি ভালো বিকল্প'
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-[18px] h-[18px] shrink-0 bg-[#00a82d] text-white rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5" strokeWidth={4} />
              </div>
              <span className="text-[#111111] font-semibold text-[17px] leading-tight">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Button */}
      <div className="pt-2">
        <button 
          onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-[#009420] text-white text-[22px] font-bold py-3 px-14 rounded-md shadow-md transition-transform hover:scale-[1.02] active:scale-95 border-b-4 border-[#007018]"
        >
          অর্ডার করুন
        </button>
      </div>
    </div>
  );
}
