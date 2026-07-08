"use client";

import { useState } from 'react';
import { Lock, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('3kg');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    '1kg': 1, '2kg': 1, '3kg': 1, '5kg': 1
  });
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [district, setDistrict] = useState('Sherpur');
  const [fullAddress, setFullAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitOrder = async () => {
    if (!fullName || !mobileNumber || !fullAddress) {
      setErrorMessage('অনুগ্রহ করে নাম, মোবাইল নাম্বার এবং পূর্ণ ঠিকানা দিন।');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phoneNumber: mobileNumber,
          whatsappNumber,
          district,
          fullAddress,
          packageType: selectedProduct,
          paymentMethod,
          quantity: quantities[selectedProduct] || 1
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/checkout/success?orderId=${data.order.id.slice(0, 8)}&method=${paymentMethod}&product=${selectedProduct}&qty=${quantities[selectedProduct] || 1}`);
      } else {
        setErrorMessage(data.message || 'অর্ডার করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।');
    } finally {
      setIsLoading(false);
    }
  };

  const products = [
    { id: '1kg', name: '১ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '1,650.00৳' },
    { id: '2kg', name: '২ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '3,200.00৳' },
    { id: '3kg', name: '৩ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '4,500.00৳' },
    { id: '5kg', name: '৫ কেজি মিশরীয় মেডজুল খেজুর × 1', price: '7,500.00৳', tag: 'বেস্ট সেলার' },
  ];

  const selectedProductData = products.find(p => p.id === selectedProduct) || products[0];
  const selectedProductPrice = parseInt(selectedProductData.price.replace(/,/g, ''));
  const selectedProductQuantity = quantities[selectedProduct] || 1;
  const deliveryCharge = 130;
  const totalPrice = (selectedProductPrice * selectedProductQuantity) + deliveryCharge;

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  return (
    <div className="px-4 py-8 md:px-12 lg:px-24 text-[#222222]">
      <div className="mx-auto max-w-7xl">
        
        {/* Login Toggle Section */}
        <div className="mb-10">
          <div className="text-[#515151] flex items-center gap-2 text-[15px]">
            <Square className="w-4 h-4 text-[#e35a34]" /> 
            <span>Returning customer?</span>
            <button 
              onClick={() => setShowLogin(!showLogin)} 
              className="text-[#e35a34] hover:text-[#d14f2e] transition-colors font-medium"
            >
              Click here to login
            </button>
          </div>

          {/* Expandable Login Form */}
          {showLogin && (
            <div className="mt-6 border border-[#e5e5e5] p-6 lg:p-8 text-[#515151] animate-in fade-in slide-in-from-top-2 duration-300 rounded-sm shadow-xs">
              <p className="mb-6 text-[15px]">
                If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-[14px] font-semibold mb-2">
                    Username or email <span className="text-[#e35a34]">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 outline-none focus:border-[#e35a34] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold mb-2">
                    Password <span className="text-[#e35a34]">*</span>
                  </label>
                  <input 
                    type="password" 
                    className="w-full border border-[#e5e5e5] rounded-sm px-3 py-2.5 outline-none focus:border-[#e35a34] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4 mt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-[14px]">
                  <input type="checkbox" className="accent-[#e35a34] w-3.5 h-3.5 border-[#e5e5e5]" />
                  Remember me
                </label>
              </div>
              
              <button className="w-full bg-[#e35a34] hover:bg-[#d14f2e] text-white py-2.5 font-semibold rounded-sm transition-colors text-[15px]">
                Login
              </button>

              <div className="mt-4 text-right">
                <a href="#" className="text-[#e35a34] hover:text-[#d14f2e] text-[14px] transition-colors">Lost your password?</a>
              </div>

            </div>
          )}
        </div>

        {/* Your Products Section */}
        <div className="mb-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-neutral-800 mb-6 text-left">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => {
              const isSelected = selectedProduct === product.id;
              return (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative flex items-start gap-3 md:gap-4 p-4 md:p-5 cursor-pointer transition-all bg-white border rounded-md overflow-hidden ${
                    isSelected ? 'border-[#009e19] shadow-sm' : 'border-neutral-300'
                  }`}
                >
                  {/* Delivery Free Ribbon */}
                  <div className="absolute right-[-35px] top-[15px] w-[140px] transform rotate-45 bg-[#f05924] text-white text-[12px] md:text-[13px] font-bold py-1 text-center shadow-sm z-10">
                    Delivery Free!
                  </div>

                  <div className="flex items-center mt-1">
                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#009e19]' : 'border-neutral-300'}`}>
                      {isSelected && <div className="w-[8px] h-[8px] rounded-full bg-[#009e19]" />}
                    </div>
                  </div>
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-white rounded flex items-center justify-center overflow-hidden border border-neutral-200">
                    <img src="/banner-img/product-banner.webp" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pr-4">
                    <div className="text-[15px] md:text-[17px] font-bold text-neutral-800 leading-snug mb-1">
                      {product.name}
                    </div>
                    <div className="text-[14px] text-neutral-500 mb-4">
                      বিশেষ ডিসকাউন্ট অফার
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Real quantity selector */}
                      <div className="flex items-center border border-neutral-300 rounded-sm bg-white">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}
                          className="px-2.5 py-0.5 text-neutral-500 hover:bg-neutral-50 text-[16px] leading-tight"
                        >-</button>
                        <span className="px-3.5 py-0.5 border-x border-neutral-300 text-[14px] font-semibold text-neutral-700">
                          {quantities[product.id] || 1}
                        </span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}
                          className="px-2.5 py-0.5 text-neutral-500 hover:bg-neutral-50 text-[16px] leading-tight"
                        >+</button>
                      </div>
                      <span className="font-extrabold text-[16px] md:text-[18px] text-neutral-900">{product.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" id="order">
          
          {/* LEFT COLUMN: Billing & Shipping */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6 text-neutral-900">
                ডেলিভারি বিস্তারিত
              </h2>
              
              <div className="space-y-5 bg-[#fdfdfd] p-5 md:p-6 rounded-md border border-neutral-200 shadow-sm">
                {/* Full Name */}
                <div>
                  <label className="block text-[15px] font-bold mb-1.5 text-neutral-800">
                    পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 text-[15px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-[15px] font-bold mb-1.5 text-neutral-800">
                    মোবাইল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="আপনার ১১ ডিজিটের মোবাইল নাম্বার"
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 text-[15px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-[15px] font-bold mb-1.5 text-neutral-800">
                    হোয়াটসঅ্যাপ নাম্বার (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="প্রবাসীদের জন্য প্রযোজ্য"
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 text-[15px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-[15px] font-bold mb-1.5 text-neutral-800">
                    পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="গ্রাম/এলাকা, থানা, জেলা"
                    className="w-full rounded-md border border-neutral-300 px-4 py-3 text-[15px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Section */}
            <div>
              <div className="flex justify-between items-center w-full rounded-md border border-[#c3e6cb] p-4 text-[16px] font-bold text-[#155724] bg-[#d4edda] shadow-sm">
                <span>ডেলিভারি চার্জ:</span>
                <span>{deliveryCharge.toLocaleString()}.00৳</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Your Order Details */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold tracking-tight mb-6 text-neutral-900">
              অর্ডার সামারি
            </h2>

            <div className="border border-neutral-200 rounded-lg p-1 bg-white shadow-sm">
              {/* Product Table Header */}
              <div className="flex justify-between text-base font-bold pb-3 pt-2 border-b border-dashed border-neutral-200 px-3">
                <span className="text-neutral-600">Product</span>
                <span className="text-neutral-600">Subtotal</span>
              </div>

              {/* Product Item Row */}
              <div className="py-4 border-b border-dashed border-neutral-200 px-3">
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="h-16 w-16 flex-shrink-0 bg-white rounded overflow-hidden border border-neutral-200 flex items-center justify-center p-1">
                    <img src="/banner-img/product-banner.webp" alt="Product" className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Product Details & Internal Pricing Breakdown */}
                  <div className="flex-1 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-[15px] font-bold text-neutral-800 leading-tight">
                        {selectedProductData.name.split(' ×')[0]}
                      </p>
                      <p className="text-[13px] text-neutral-500 font-bold">Qty: {selectedProductQuantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[16px] font-bold text-neutral-900">
                        {selectedProductData.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Rows */}
              <div className="space-y-3 py-4 border-b border-dashed border-neutral-200 px-3 text-[15px]">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 font-bold">Subtotal</span>
                  <div className="text-right">
                    <span className="block font-bold text-neutral-900">{(selectedProductPrice * selectedProductQuantity).toLocaleString()}.00৳</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 font-bold">Shipping</span>
                  <div className="text-right">
                    <span className="block font-bold text-neutral-900">{deliveryCharge.toLocaleString()}.00৳</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 px-3 text-[20px] font-bold text-neutral-900 bg-[#f4fbf6] rounded-b-lg">
                <span>Total</span>
                <span className="text-[#009e19]">{totalPrice.toLocaleString()}.00৳</span>
              </div>

              {/* Payment Methods Section */}
              <div className="mt-4 bg-[#f9f9f9] rounded-md p-4 space-y-4">
                {/* Cash on Delivery */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer text-base font-semibold text-neutral-800">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="h-4 w-4 accent-orange-600 border-neutral-300 text-orange-600 focus:ring-0"
                    />
                    <span>ক্যাশ অন ডেলিভারি</span>
                  </label>
                  
                  {/* Tooltip Description block */}
                  <div className="relative bg-[#e9e9e9] p-3 rounded text-sm text-neutral-700 font-medium ml-7 before:content-[''] before:absolute before:-top-2 before:left-4 before:w-0 before:h-0 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-b-8 before:border-b-[#e9e9e9]">
                    পণ্য হাতে পেয়ে ডেলিভারিম্যানকে টাকা বুঝিয়ে দিন।
                  </div>
                </div>

                {/* bKash Payment */}
                <div className="flex justify-between items-center pt-2">
                  {/* <label className="flex items-center gap-3 cursor-pointer text-base font-semibold text-neutral-800">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'BKASH'}
                      onChange={() => setPaymentMethod('BKASH')}
                      className="h-4 w-4 accent-orange-600 border-neutral-300 text-orange-600 focus:ring-0"
                    />
                    <span>bKash Payment Gateway</span>
                  </label> */}
                  {/* Mini bKash Logo Placeholder matching look */}
                  {/* <div className="flex items-center gap-1 font-bold text-[#d12053] italic text-sm">
                    <span>bKash</span>
                    <div className="w-4 h-4 bg-[#d12053] transform rotate-45 origin-center clip-path-logo inline-block ml-0.5" />
                  </div> */}
                </div>
              </div>

              {/* Submit Button */}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded border border-red-200">
                  {errorMessage}
                </div>
              )}
              <button 
                onClick={handleSubmitOrder}
                disabled={isLoading}
                className={`w-full mt-4 bg-[#008000] hover:bg-[#006e00] text-white font-bold py-3.5 px-4 rounded transition-colors flex items-center justify-center gap-2 text-base shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Lock className="h-4 w-4 fill-current" />
                <span>{isLoading ? 'Processing...' : `Place Order ${parseInt(products.find(p => p.id === selectedProduct)?.price.replace(/,/g, '') || '0') + 130}.00৳`}</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}