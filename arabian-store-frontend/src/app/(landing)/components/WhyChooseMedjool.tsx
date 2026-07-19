"use client";

import { Leaf, Heart, Zap, Star } from 'lucide-react';
import ScrollAnimate from './ScrollAnimate';

const reasons = [
  {
    icon: <Leaf className="w-7 h-7 text-[#008013]" />,
    title: "প্রাকৃতিক গুণমান",
    desc: "কোনো কৃত্রিম রং বা প্রিজারভেটিভ ছাড়াই সম্পূর্ণ প্রাকৃতিক উপায়ে প্রস্তুত।",
    bg: "#F0FBF4",
    border: "#C5E8CD",
  },
  {
    icon: <Zap className="w-7 h-7 text-[#C59B27]" />,
    title: "দ্রুত এনার্জি",
    desc: "প্রাকৃতিক চিনি ও কার্বোহাইড্রেটে ভরপুর, যা তাৎক্ষণিক শক্তি সরবরাহ করে।",
    bg: "#FFFBF0",
    border: "#F0DFA0",
  },
  {
    icon: <Heart className="w-7 h-7 text-[#E05252]" />,
    title: "স্বাস্থ্য উপকারিতা",
    desc: "ফাইবার, পটাশিয়াম ও অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ। হৃদয় ও হজমের জন্য উপকারী।",
    bg: "#FFF5F5",
    border: "#F5C0C0",
  },
  {
    icon: <Star className="w-7 h-7 text-[#C59B27]" />,
    title: "সেরা স্বাদ কোয়ালিটি",
    desc: "মিশর থেকে সরাসরি আমদানি। প্রতিটি খেজুর যত্নসহকারে বাছাই করা হয়।",
    bg: "#FFFBF0",
    border: "#F0DFA0",
  },
];

export default function WhyChooseMedjool() {
  return (
    <section className="bg-[#F4F0E8] py-10 md:py-14 px-4 md:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Decorative Green Lines */}
        <ScrollAnimate animation="animate__fadeInDown" className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-extrabold text-[#1A1A1A] text-center tracking-wide px-2">
            কেন আমাদের মেডজুল খেজুর বেছে নেবেন?
          </h2>
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-l from-transparent to-[#008013]" />
        </ScrollAnimate>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {reasons.map((r, i) => (
            <ScrollAnimate 
              key={i}
              animation="animate__zoomIn"
              className="flex flex-col items-center text-center p-3 md:p-6 bg-white rounded-md border border-[#EAE6DF] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-2 md:mb-3 p-2 md:p-3 rounded-full bg-[#F4F0E8] shadow-sm">
                {r.icon}
              </div>
              <h3 className="font-bold text-[15px] md:text-[20px] text-[#2D251E] mb-1 md:mb-2 leading-tight">{r.title}</h3>
              <p className="text-[13px] md:text-[15px] text-[#333] font-medium leading-relaxed">{r.desc}</p>
            </ScrollAnimate>
          ))}
        </div>

      </div>
    </section>
  );
}
