import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full">

      {/* Top Contact Section */}
      <div className="bg-[#1a4a2e] py-10 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-[#C59B27] flex items-center justify-center bg-white overflow-hidden">
                  <img src="/Arabian-Store-Logo-Wide.webp" alt="Arabian Store" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] text-white/50 tracking-wide">মিডিয়াম</span>
                  <span className="font-extrabold text-[18px] text-white leading-tight">মেডজুল</span>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs text-center md:text-left">
                মিশরীয় প্রিমিয়াম মেডজুল খেজুর — বাংলাদেশের সেরা মানের সাথে।
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg text-[#C59B27]">অর্ডার করতে কল করুন</h3>
              <a href="tel:09666767673" className="flex items-center gap-2 hover:text-[#C59B27] transition-colors text-base font-semibold">
                <div className="w-8 h-8 bg-[#C59B27] rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white fill-current" />
                </div>
                09666 767673
              </a>
              <a href="tel:01403510331" className="flex items-center gap-2 hover:text-[#C59B27] transition-colors text-base font-semibold">
                <div className="w-8 h-8 bg-[#C59B27] rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white fill-current" />
                </div>
                01403510331
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg text-[#C59B27]">সরাসরি আউটলেট</h3>
              <div className="flex items-start gap-2 text-sm text-white/80 leading-relaxed">
                <MapPin className="w-5 h-5 text-[#C59B27] flex-shrink-0 mt-0.5" />
                <p>৪৩/২ পশ্চিম চৌধুরীপাড়া, মালিবাগ, ঢাকা।<br />
                  (আবুল হোটেল থেকে রামপুরার দিকে, উত্তরা ব্যাংকের অপজিটে, মধুবাগের গলি)</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#132e1e] py-5 text-white/50 text-center text-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© 2026 Arabian Store BD. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
