"use client";

import { Lock } from 'lucide-react';

interface OrderSummaryProps {
  selectedProductData: any;
  quantities: Record<string, number>;
  selectedProduct: string;
  subtotal: number;
  totalPrice: number;
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  errorMessage: string;
  handleSubmitOrder: () => void;
  isCreatingOrder: boolean;
  deliveryCharge: number;
}

export default function OrderSummary({
  selectedProductData,
  quantities,
  selectedProduct,
  subtotal,
  totalPrice,
  paymentMethod,
  setPaymentMethod,
  errorMessage,
  handleSubmitOrder,
  isCreatingOrder,
  deliveryCharge
}: OrderSummaryProps) {
  return (
    <div>
      <h3 className="text-[16px] md:text-[18px] font-bold text-[#333] mb-4">Your order</h3>
      <div className="sticky top-20">

        {/* Table Header */}
        <div className="flex justify-between items-center border-b border-dashed border-[#ccc] pb-2 mb-3">
          <span className="font-bold text-[14px] text-[#555]">Product</span>
          <span className="font-bold text-[14px] text-[#555]">Subtotal</span>
        </div>

        {/* Selected Product Row */}
        {selectedProductData && (
          <div className="flex justify-between items-center border-b border-dashed border-[#ccc] pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 p-0.5">
                <img
                  src={selectedProductData.image ? (selectedProductData.image.startsWith('/uploads/') ? `http://localhost:5000${selectedProductData.image}` : selectedProductData.image) : "/banner-img/product-bannerr.jpeg"}
                  alt={selectedProductData.title}
                  className="w-full h-full object-contain rounded-sm"
                />
              </div>
              <span className="text-[14px] text-[#555] pr-2">{selectedProductData.title} × {quantities[selectedProduct] || 1}</span>
            </div>
            <span className="text-[14px] text-[#555] font-medium whitespace-nowrap">৳ {(Number(selectedProductData.discountPrice || selectedProductData.price) * (quantities[selectedProduct] || 1)).toLocaleString()}</span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between items-center border-b border-dashed border-[#ccc] pb-3 mb-3">
          <span className="text-[14px] text-[#555]">Subtotal</span>
          <span className="text-[14px] text-[#555] font-medium">৳ {subtotal.toLocaleString()}</span>
        </div>

        {/* TODO: Uncomment when client confirms shipping details */}
        <div className="flex justify-between items-center border-b border-dashed border-[#ccc] pb-3 mb-3">
          <span className="text-[14px] text-[#555]">Delivery Charge</span>
          <span className="text-[14px] text-[#555] font-medium">৳ {deliveryCharge.toLocaleString()}</span>
        </div>
       

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[14px] text-[#333] font-bold">Total</span>
          <span className="text-[14px] text-[#333] font-bold">৳ {totalPrice.toLocaleString()}</span>
        </div>

        {/* Payment Method */}
        <div className="mb-5 mt-8">
          <label className="flex items-center gap-2 cursor-pointer mb-2">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="payment_method"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="appearance-none w-5 h-5 rounded-full border-[5px] border-[#3eb56b] bg-white cursor-pointer"
              />
            </div>
            <span className="text-[15px] text-[#333]">ক্যাশঅন ডেলিভারি</span>
          </label>
          <div className="relative bg-[#ebebeb] p-5 text-[14px] text-[#555]">
            <div className="absolute top-[-6px] left-[32px] w-3 h-3 bg-[#ebebeb] transform rotate-45"></div>
            পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-[13px] font-medium rounded-sm border border-red-200">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmitOrder}
            disabled={isCreatingOrder || !selectedProductData}
            className={`w-full bg-[#008013] hover:bg-[#006810] text-white font-bold py-3 px-4 rounded-none transition-all flex items-center justify-center gap-2 text-[17px]  ${isCreatingOrder || !selectedProductData ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
          >
            <Lock className="h-4 w-4" />
            <span>{isCreatingOrder ? 'প্রসেস হচ্ছে...' : `অর্ডার করুন — ${totalPrice.toLocaleString()}.00৳`}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
