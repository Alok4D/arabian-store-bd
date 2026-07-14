"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '80850';
  const paymentMethod = searchParams.get('method') || 'COD';
  const productId = searchParams.get('product') || '3kg';
  const quantity = parseInt(searchParams.get('qty') || '1', 10);

  const products = [
    { id: '1kg', name: '১ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '1,650.00৳' },
    { id: '2kg', name: '২ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '3,200.00৳' },
    { id: '3kg', name: '৩ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '4,500.00৳' },
    { id: '5kg', name: '৫ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '7,500.00৳' },
  ];

  const selectedProductData = products.find(p => p.id === productId) || products[0];
  const selectedProductPrice = parseInt(selectedProductData.price.replace(/,/g, ''));
  const deliveryCharge = 130;
  const totalPrice = (selectedProductPrice * quantity) + deliveryCharge;

  return (
    <div className="py-12 md:py-20 text-[#222222] min-h-screen bg-white">
      <div className="mx-auto max-w-4xl flex flex-col items-center px-4">
        
        {/* Logo */}
        <div className="w-32 md:w-48 mb-6">
          <img src="/logo/navandfooterlogo.png" alt="Arabian Store" className="w-full h-[100px] object-contain" />
        </div>
        
        <h1 className="text-4xl md:text-[45px] font-bold mb-3 text-black">ধন্যবাদ</h1>
        <p className="text-lg md:text-[22px] font-medium text-neutral-600 mb-10 text-center">
          খেজুর বাড়ি থেকে অর্ডার করার জন্য! আপনার অর্ডারটি কনফার্ম করা হয়েছে।
        </p>

        <div className="w-full max-w-3xl border border-neutral-200 rounded-lg p-6 md:p-10 text-left bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)]">
          
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-neutral-800">Your order has been received.</h2>

          {/* Order Meta Info box */}
          <div className="bg-[#f9f9f9] rounded-md p-4 md:p-6 grid grid-cols-2 md:flex md:flex-row gap-y-6 md:gap-0 text-sm text-neutral-600 mb-6">
            <div className="flex flex-col border-r border-neutral-300 pr-3 md:pr-8">
              <span className="font-medium mb-1">Order number:</span>
              <span className="font-bold text-neutral-900 break-all">{orderId}</span>
            </div>
            <div className="flex flex-col pl-4 md:px-8 md:border-r border-neutral-300">
              <span className="font-medium mb-1">Date:</span>
              <span className="font-bold text-neutral-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex flex-col border-r border-neutral-300 pr-3 md:px-8 md:border-r border-neutral-300">
              <span className="font-medium mb-1">Total:</span>
              <span className="font-bold text-neutral-900">{totalPrice.toLocaleString()}.00৳</span>
            </div>
            <div className="flex flex-col pl-4 md:px-8">
              <span className="font-medium mb-1">Payment method:</span>
              <span className="font-bold text-neutral-900">{paymentMethod === 'COD' ? 'Cash on delivery' : 'bKash'}</span>
            </div>
          </div>

          {paymentMethod === 'COD' && (
            <p className="text-neutral-500 text-sm mb-10">Pay with cash upon delivery.</p>
          )}

          {/* Order Details section */}
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-neutral-800">Order details</h2>
          
          <div className="w-full text-[14px] md:text-[15px] text-neutral-600">
            <div className="flex justify-between border-b border-neutral-200 pb-3 mb-4 font-bold text-neutral-800">
              <span>Product</span>
              <span>Total</span>
            </div>
            
            <div className="flex justify-between border-b border-dashed border-neutral-200 pb-4 mb-4">
              <span className="pr-4">{selectedProductData.name.split(' ×')[0]} <strong className="text-neutral-900">× {quantity}</strong></span>
              <span className="font-bold text-neutral-900 whitespace-nowrap">{selectedProductData.price}</span>
            </div>
            
            <div className="flex justify-between border-b border-dashed border-neutral-200 pb-4 mb-4">
              <span className="font-bold text-neutral-800">Subtotal:</span>
              <span className="font-bold text-neutral-900">{(selectedProductPrice * quantity).toLocaleString()}.00৳</span>
            </div>
            
            <div className="flex justify-between border-b border-dashed border-neutral-200 pb-4 mb-4">
              <span className="font-bold text-neutral-800">Shipping:</span>
              <span className="text-right">{deliveryCharge.toLocaleString()}.00৳ <span className="text-neutral-500 block md:inline mt-1 md:mt-0">via ডেলিভারি চার্জ</span></span>
            </div>

            <div className="flex justify-between border-b border-dashed border-neutral-200 pb-4 mb-4">
              <span className="font-bold text-neutral-800">Payment method:</span>
              <span>{paymentMethod === 'COD' ? 'Cash on delivery' : 'bKash'}</span>
            </div>

            <div className="flex justify-between pb-2">
              <span className="font-bold text-neutral-800 text-[16px] md:text-lg">Total:</span>
              <span className="font-bold text-neutral-900 text-[16px] md:text-lg">{totalPrice.toLocaleString()}.00৳</span>
            </div>
          </div>
          
        </div>

        {/* Back to Home Button */}
        <div className="mt-10 flex justify-center px-4">
          <Link 
            href="/" 
            className="bg-[#009e19] hover:bg-[#008a16] text-white font-bold py-3.5 px-8 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 text-[18px] w-full max-w-[320px]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-lg text-neutral-600">অপেক্ষা করুন...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
