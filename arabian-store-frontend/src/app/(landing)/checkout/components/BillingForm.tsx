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
            <option value="Dhaka">Dhaka</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Jamalpur">Jamalpur</option>
            <option value="Kishoreganj">Kishoreganj</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Munshiganj">Munshiganj</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Netrokona">Netrokona</option>
            <option value="Rajbari">Rajbari</option>
            <option value="Shariatpur">Shariatpur</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Tangail">Tangail</option>
            <option value="Bogra">Bogra</option>
            <option value="Joypurhat">Joypurhat</option>
            <option value="Naogaon">Naogaon</option>
            <option value="Natore">Natore</option>
            <option value="Chapainawabganj">Chapainawabganj</option>
            <option value="Pabna">Pabna</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Gaibandha">Gaibandha</option>
            <option value="Kurigram">Kurigram</option>
            <option value="Lalmonirhat">Lalmonirhat</option>
            <option value="Nilphamari">Nilphamari</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Thakurgaon">Thakurgaon</option>
            <option value="Barguna">Barguna</option>
            <option value="Barishal">Barishal</option>
            <option value="Bhola">Bhola</option>
            <option value="Jhalokati">Jhalokati</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Bandarban">Bandarban</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Chandpur">Chandpur</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Cumilla">Cumilla</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Feni">Feni</option>
            <option value="Khagrachari">Khagrachari</option>
            <option value="Lakshmipur">Lakshmipur</option>
            <option value="Noakhali">Noakhali</option>
            <option value="Rangamati">Rangamati</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Moulvibazar">Moulvibazar</option>
            <option value="Sunamganj">Sunamganj</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Bagerhat">Bagerhat</option>
            <option value="Chuadanga">Chuadanga</option>
            <option value="Jashore">Jashore</option>
            <option value="Jhenaidah">Jhenaidah</option>
            <option value="Khulna">Khulna</option>
            <option value="Kushtia">Kushtia</option>
            <option value="Magura">Magura</option>
            <option value="Meherpur">Meherpur</option>
            <option value="Narail">Narail</option>
            <option value="Satkhira">Satkhira</option>
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
