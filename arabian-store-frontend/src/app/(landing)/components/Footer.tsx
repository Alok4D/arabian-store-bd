import React from 'react';

export function Footer() {
  return (
    <footer className="w-full">
      {/* Top Section - Light Green */}
      <div className="bg-[#EBF3EB] py-12 border-t border-green-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            
            {/* Left Column: Contact */}
            <div className="flex flex-col items-center md:items-start md:pl-10">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#154360]">অর্ডার করতে কল করুন</h3>
              <div className="space-y-3 font-medium text-lg md:text-xl text-[#2a68c4]">
                <a href="tel:09666767673" className="flex items-center gap-2 hover:underline">
                  <span className="text-[#d82a3b]">☎</span> 09666 767673
                </a>
                <a href="tel:01403510331" className="flex items-center gap-2 hover:underline">
                  <span className="text-[#d82a3b]">☎</span> 01403510331
                </a>
              </div>
            </div>

            {/* Right Column: Address */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#154360]">সরাসরি আউটলেট থেকে নিতে যোগাযোগ:</h3>
              <div className="text-lg text-neutral-800 space-y-1">
                <p>৪৩/২ পশ্চিম চৌধুরীপাড়া, মালিবাগ, ঢাকা।</p>
                <p className="text-base text-neutral-800">(আবুল হোটেল থেকে রামপুরার দিকে যেতে উত্তরা ব্যাংকের অপজিটে</p>
                <p className="text-base text-neutral-800">মধুবাগের গলি, নূর মসজিদের উত্তরগেইট)</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section - Beige */}
      <div className="bg-[#f4ebe1] py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center text-neutral-600">
            
            {/* Logo area */}
            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 text-center md:text-left">
             <img src="/Arabian-Store-Logo-Wide.webp" alt="Arabian Store" className="w-full md:w-auto h-16 md:h-20 object-contain" />
            </div>

            {/* Links area */}
            <div className="flex flex-col items-center justify-center space-y-4 font-medium text-sm text-neutral-500">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Refund and Returns Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
            </div>

            {/* Facebook Page Widget Placeholder */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[340px] h-32 bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden flex flex-col relative">
                 {/* Fake FB Banner */}
                 <div 
                   className="h-20 bg-[#1e4a28] w-full flex items-center justify-center text-white/50 text-xs bg-cover bg-center"
                   style={{ backgroundImage: "url('/702625471_1452288243581247_6964213978760610794_n.png')" }}
                 >
                 </div>
                 {/* Fake FB Page Info */}
                 <div className="h-12 bg-white flex items-center px-4 gap-3 relative">
                    <div className="w-12 h-12 rounded-full border-[3px] border-white bg-white shadow-sm absolute -top-6 left-4 flex items-center justify-center text-[8px] font-bold overflow-hidden">
                       <img src="/471756009_1028734385936637_4350842613043007973_n.jpg" alt="Arabian Store" className="w-full h-full object-contain" />
                    </div>
                    <div className="ml-14 flex-1 mt-1">
                        <h4 className="font-bold text-black text-sm leading-tight hover:underline cursor-pointer">Arabian Store</h4>
                        <p className="text-[11px] text-neutral-500">49K followers</p>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
