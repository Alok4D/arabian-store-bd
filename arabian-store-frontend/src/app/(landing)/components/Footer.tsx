
import { Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full">

      {/* Top Contact Section */}
      <div className="bg-[#008013] py-8 md:py-16 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-4 xl:px-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-12">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <Image src="/Arabian-Store-Logo-Wide.webp" alt="Arabian Store" width={240} height={60} className="object-contain w-[200px] md:w-[240px]" />
                </div>
              </div>
              <p className="text-md text-white/60 leading-relaxed max-w-xs text-center md:text-left">
                মিশরীয় প্রিমিয়াম মেডজুল খেজুর — বাংলাদেশের সেরা মানের সাথে।
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg lg:text-xl text-[#C59B27]">অর্ডার করতে কল করুন</h3>
              <a href="tel:09666767673" className="flex items-center gap-2 hover:text-[#C59B27] transition-colors text-base font-semibold">
                <div className="w-8 h-8 bg-[#C59B27] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white fill-current" />
                </div>
                09666 767673
              </a>
              <a href="tel:01403510331" className="flex items-center gap-2 hover:text-[#C59B27] transition-colors text-base font-semibold">
                <div className="w-8 h-8 bg-[#C59B27] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white fill-current" />
                </div>
                01403510331
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg lg:text-xl text-[#C59B27]">সরাসরি আউটলেট</h3>
              <div className="flex items-start gap-2 text-md text-white/80 leading-relaxed">
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
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <p>© 2026 Arabian Store BD. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
