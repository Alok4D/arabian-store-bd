"use client";

import React from 'react';

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
  return (
    <div>
      <h3 className="text-[16px] md:text-[18px] font-bold text-[#333] mb-4">Billing details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-[#555] mb-1">আপনার সম্পূর্ণ নাম লিখুন <span className="text-red-500">*</span></label>
          <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="আপনার নাম" className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-sm focus:outline-none focus:border-[#008013] focus:ring-1 focus:ring-[#008013] text-[14px] bg-white text-[#333]" />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[#555] mb-1">আপনার জেলা <span className="text-red-500">*</span></label>
          <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full px-3 py-2.5 border border-[#e5e7eb] rounded-sm focus:outline-none focus:border-[#008013] focus:ring-1 focus:ring-[#008013] text-[14px] bg-white text-[#333]">
            <option value="ঢাকা">ঢাকা</option>
            <option value="ফরিদপুর">ফরিদপুর</option>
            <option value="গাজীপুর">গাজীপুর</option>
            <option value="গোপালগঞ্জ">গোপালগঞ্জ</option>
            <option value="জামালপুর">জামালপুর</option>
            <option value="কিশোরগঞ্জ">কিশোরগঞ্জ</option>
            <option value="মাদারীপুর">মাদারীপুর</option>
            <option value="মানিকগঞ্জ">মানিকগঞ্জ</option>
            <option value="মুন্সিগঞ্জ">মুন্সিগঞ্জ</option>
            <option value="ময়মনসিংহ">ময়মনসিংহ</option>
            <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</option>
            <option value="নরসিংদী">নরসিংদী</option>
            <option value="নেত্রকোনা">নেত্রকোনা</option>
            <option value="রাজবাড়ী">রাজবাড়ী</option>
            <option value="শরীয়তপুর">শরীয়তপুর</option>
            <option value="শেরপুর">শেরপুর</option>
            <option value="টাঙ্গাইল">টাঙ্গাইল</option>
            <option value="বগুড়া">বগুড়া</option>
            <option value="জয়পুরহাট">জয়পুরহাট</option>
            <option value="নওগাঁ">নওগাঁ</option>
            <option value="নাটোর">নাটোর</option>
            <option value="নবাবগঞ্জ">নবাবগঞ্জ</option>
            <option value="পাবনা">পাবনা</option>
            <option value="রাজশাহী">রাজশাহী</option>
            <option value="সিরাজগঞ্জ">সিরাজগঞ্জ</option>
            <option value="দিনাজপুর">দিনাজপুর</option>
            <option value="গাইবান্ধা">গাইবান্ধা</option>
            <option value="কুড়িগ্রাম">কুড়িগ্রাম</option>
            <option value="লালমনিরহাট">লালমনিরহাট</option>
            <option value="নীলফামারী">নীলফামারী</option>
            <option value="পঞ্চগড়">পঞ্চগড়</option>
            <option value="রংপুর">রংপুর</option>
            <option value="ঠাকুরগাঁও">ঠাকুরগাঁও</option>
            <option value="বরগুনা">বরগুনা</option>
            <option value="বরিশাল">বরিশাল</option>
            <option value="ভোলা">ভোলা</option>
            <option value="ঝালকাঠি">ঝালকাঠি</option>
            <option value="পটুয়াখালী">পটুয়াখালী</option>
            <option value="পিরোজপুর">পিরোজপুর</option>
            <option value="বান্দরবান">বান্দরবান</option>
            <option value="ব্রাহ্মণবাড়িয়া">ব্রাহ্মণবাড়িয়া</option>
            <option value="চাঁদপুর">চাঁদপুর</option>
            <option value="চট্টগ্রাম">চট্টগ্রাম</option>
            <option value="কুমিল্লা">কুমিল্লা</option>
            <option value="কক্সবাজার">কক্সবাজার</option>
            <option value="ফেনী">ফেনী</option>
            <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
            <option value="লক্ষ্মীপুর">লক্ষ্মীপুর</option>
            <option value="নোয়াখালী">নোয়াখালী</option>
            <option value="রাঙ্গামাটি">রাঙ্গামাটি</option>
            <option value="হবিগঞ্জ">হবিগঞ্জ</option>
            <option value="মৌলভীবাজার">মৌলভীবাজার</option>
            <option value="সুনামগঞ্জ">সুনামগঞ্জ</option>
            <option value="সিলেট">সিলেট</option>
            <option value="বাগেরহাট">বাগেরহাট</option>
            <option value="চুয়াডাঙ্গা">চুয়াডাঙ্গা</option>
            <option value="যশোর">যশোর</option>
            <option value="ঝিনাইদহ">ঝিনাইদহ</option>
            <option value="খুলনা">খুলনা</option>
            <option value="কুষ্টিয়া">কুষ্টিয়া</option>
            <option value="মাগুরা">মাগুরা</option>
            <option value="মেহেরপুর">মেহেরপুর</option>
            <option value="নড়াইল">নড়াইল</option>
            <option value="সাতক্ষীরা">সাতক্ষীরা</option>
          </select>
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
