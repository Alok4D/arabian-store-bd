
import { Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full">

      {/* Top Contact Section */}
      <div className="bg-[#D6D19C] py-8 md:py-16 text-[#0D3A20]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-4 xl:px-0 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-12">

            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <Image src="/logo/navandfooterlogo.png" alt="Khejur Bari" width={240} height={240} className="object-contain w-[150px] md:w-[200px]" />
                </div>
              </div>
              <p className="text-md text-[#0D3A20]/80 leading-relaxed max-w-xs text-center md:text-left font-medium">
                মিশরীয় প্রিমিয়াম মেডজুল খেজুর — বাংলাদেশের সেরা মানের সাথে।
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg lg:text-xl text-[#0D3A20]">অর্ডার করতে কল করুন</h3>
              <a href="tel:01817113624" className="flex items-center gap-2 hover:text-[#0D3A20]/70 transition-colors text-base font-bold">
                <div className="w-8 h-8 bg-[#0D3A20] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#D6D19C] fill-current" />
                </div>
                01817113624
              </a>
              <a href="tel:01403510331" className="flex items-center gap-2 hover:text-[#0D3A20]/70 transition-colors text-base font-bold">
                <div className="w-8 h-8 bg-[#0D3A20] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#D6D19C] fill-current" />
                </div>
                01403510331
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="font-bold text-lg lg:text-xl text-[#0D3A20]">সরাসরি আউটলেট</h3>
              <div className="flex items-start gap-2 text-md text-[#0D3A20]/90 font-medium leading-relaxed">
                <MapPin className="w-5 h-5 text-[#0D3A20] flex-shrink-0 mt-0.5" />
                <p>৪৩/২ পশ্চিম চৌধুরীপাড়া, মালিবাগ, ঢাকা।<br />
                  (আবুল হোটেল থেকে রামপুরার দিকে, উত্তরা ব্যাংকের অপজিটে, মধুবাগের গলি)</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0B3019] py-5 text-[#D6D19C]/70 text-center text-sm border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
          <p>© 2026 Khejur Bari. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
}
