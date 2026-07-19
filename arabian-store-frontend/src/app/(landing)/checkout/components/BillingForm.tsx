"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const DISTRICTS = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj", 
  "Madaripur", "Manikganj", "Munshiganj", "Mymensingh", "Narayanganj", 
  "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Sherpur", "Tangail", 
  "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", 
  "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", 
  "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Barguna", "Barishal", 
  "Bhola", "Jhalokati", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", 
  "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", 
  "Lakshmipur", "Noakhali", "Rangamati", "Habiganj", "Moulvibazar", "Sunamganj", 
  "Sylhet", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", 
  "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
];

interface BillingFormProps {
  fullName: string;
  setFullName: (val: string) => void;
  district: string;
  setDistrict: (val: string) => void;
  fullAddress: string;
  setFullAddress: (val: string) => void;
  mobileNumber: string;
  setMobileNumber: (val: string) => void;
  deliveryCharge: number;
}

export default function BillingForm({
  fullName,
  setFullName,
  district,
  setDistrict,
  fullAddress,
  setFullAddress,
  mobileNumber,
  setMobileNumber,
  deliveryCharge
}: BillingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredDistricts = DISTRICTS.filter(d => 
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-[16px] md:text-[18px] font-bold text-[#333] mb-4">Billing details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-[#555] mb-1">আপনার সম্পূর্ণ নাম লিখুন <span className="text-red-500">*</span></label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="আপনার নাম" className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-sm focus:outline-none focus:border-[#008013] focus:ring-1 focus:ring-[#008013] text-[14px] bg-white text-[#333]" />
        </div>
        <div className="relative" ref={dropdownRef}>
          <label className="block text-[13px] font-bold text-[#555] mb-1">আপনার জেলা <span className="text-red-500">*</span></label>
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-3 py-2.5 border rounded-sm flex items-center justify-between cursor-pointer bg-white text-[14px] transition-colors ${isOpen ? 'border-[#008013] ring-1 ring-[#008013]' : 'border-[#e5e7eb] hover:border-[#008013]'}`}
          >
            <span className={district ? 'text-[#333]' : 'text-gray-400'}>{district || "Select District"}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-[#e5e7eb] rounded-sm shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 border-b border-[#e5e7eb] flex items-center gap-2 bg-gray-50/50">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search district..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none text-[13px] bg-transparent text-[#333] placeholder:text-gray-400"
                />
              </div>
              <div data-lenis-prevent="true" className="max-h-[220px] overflow-y-auto py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map(d => (
                    <div 
                      key={d}
                      onClick={() => {
                        setDistrict(d);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`px-3 py-2 text-[13px] cursor-pointer transition-colors ${district === d ? 'bg-[#008013]/10 text-[#008013] font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                    >
                      {d}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-[13px] text-gray-400">
                    No district found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[#555] mb-1">সম্পূর্ণ ঠিকানা পূরণ করুন <span className="text-red-500">*</span></label>
          <input type="text" value={fullAddress} onChange={e => setFullAddress(e.target.value)} placeholder="থানা/শহর" className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-sm focus:outline-none focus:border-[#008013] focus:ring-1 focus:ring-[#008013] text-[14px] bg-white text-[#333]" />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[#555] mb-1">আপনার ফোন নাম্বার <span className="text-red-500">*</span></label>
          <input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="মোবাইল নাম্বার" className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-sm focus:outline-none focus:border-[#008013] focus:ring-1 focus:ring-[#008013] text-[14px] bg-white text-[#333]" />
        </div>
      </div>

      {/* TODO: Uncomment when client confirms shipping details */}
      <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#2c3e50] mt-10 mb-4">Shipping</h3>
      <div className="flex justify-between items-center p-3 bg-[#f9f9f9] border border-[#e5e7eb] text-[14px] text-[#555]">
        <span>সারাদেশে ডেলিভারি চার্জ:</span>
        <span className="font-medium">৳ {deliveryCharge}</span>
      </div>
    </div>
  );
}
