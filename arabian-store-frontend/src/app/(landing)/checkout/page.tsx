"use client";

import { useState, useEffect } from 'react';
import { Lock, Square } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [shippingSettings, setShippingSettings] = useState({ insideDhaka: 80, outsideDhaka: 130 });
  const [fullAddress, setFullAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/products`);
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setProducts(data.data);
          setSelectedProduct(data.data[0].id);
          const initialQuantities: Record<string, number> = {};
          data.data.forEach((p: any) => {
            initialQuantities[p.id] = 1;
          });
          setQuantities(initialQuantities);
          const shipRes = await fetch(`${apiUrl}/shipping`);
          const shipData = await shipRes.json();
          if (shipData.success && shipData.data) {
            setShippingSettings({
              insideDhaka: Number(shipData.data.insideDhaka),
              outsideDhaka: Number(shipData.data.outsideDhaka)
            });
          }
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const selectedProductPrice = selectedProductData ? Number(selectedProductData.price) : 0;
  const selectedProductQuantity = quantities[selectedProduct] || 1;
  const deliveryCharge = district === 'ঢাকা' || district === 'Dhaka' ? shippingSettings.insideDhaka : shippingSettings.outsideDhaka;
  const subtotal = selectedProductPrice * selectedProductQuantity;
  const totalPrice = subtotal + deliveryCharge;

  const handleSubmitOrder = async () => {
    if (!fullName || !mobileNumber || !fullAddress || !selectedProduct) {
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
          phone: mobileNumber,
          whatsapp: whatsappNumber,
          district,
          address: fullAddress + ', ' + district,
          quantity: selectedProductQuantity,
          subtotal: subtotal,
          shippingFee: deliveryCharge,
          total: totalPrice,
          paymentMethod,
          productId: selectedProduct
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/checkout/success?orderId=${data.data.orderId}&method=${paymentMethod}&product=${selectedProductData?.title}&qty=${selectedProductQuantity}`);
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

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  if (loadingProducts) {
    return <div className="p-24 text-center">Loading products...</div>;
  }

  return (
    <div className="px-4 py-4 md:px-12 lg:px-16 text-[#222222]">
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
        <div className="mb-8">
          <h2 className="text-[24px] md:text-[28px] font-bold text-neutral-800 mb-4 text-left">Your Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => {
              const isSelected = selectedProduct === product.id;
              return (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative flex items-start gap-3 md:gap-4 p-3 md:p-4 cursor-pointer transition-all bg-white border rounded-md overflow-hidden ${
                    isSelected ? 'border-[#009e19] shadow-sm' : 'border-neutral-300'
                  }`}
                >
                  {Number(product.shippingFee) === 0 && (
                    <div className="absolute right-[-35px] top-[15px] w-[140px] transform rotate-45 bg-[#f05924] text-white text-[13px] md:text-[15px] font-bold py-1 text-center shadow-sm z-10">
                      Delivery Free!
                    </div>
                  )}

                  <div className="flex items-center mt-1">
                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#009e19]' : 'border-neutral-300'}`}>
                      {isSelected && <div className="w-[8px] h-[8px] rounded-full bg-[#009e19]" />}
                    </div>
                  </div>
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-white rounded flex items-center justify-center overflow-hidden border border-neutral-200">
                    <img 
                      src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-banner.webp"} 
                      alt={product.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 pr-4">
                    <div className="text-[18px] md:text-[20px] font-bold text-neutral-800 leading-snug mb-1">
                      {product.title}
                    </div>
                    <div className="text-[15px] md:text-[17px] text-neutral-500 mb-3">
                      {product.description || "বিশেষ ডিসকাউন্ট অফার"}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Real quantity selector */}
                      <div className="flex items-center border border-neutral-300 rounded-sm bg-white">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}
                          className="px-2.5 py-0.5 text-neutral-500 hover:bg-neutral-50 text-[18px] leading-tight"
                        >-</button>
                        <span className="px-3.5 py-0.5 border-x border-neutral-300 text-[16px] font-semibold text-neutral-700">
                          {quantities[product.id] || 1}
                        </span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}
                          className="px-2.5 py-0.5 text-neutral-500 hover:bg-neutral-50 text-[18px] leading-tight"
                        >+</button>
                      </div>
                      <span className="font-extrabold text-[18px] md:text-[22px] text-neutral-900">{Number(product.price).toLocaleString()}৳</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12" id="order">
          
          {/* LEFT COLUMN: Billing & Shipping */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight mb-4 text-neutral-900">
                ডেলিভারি বিস্তারিত
              </h2>
              
              <div className="space-y-4 bg-[#fdfdfd] p-4 md:p-5 rounded-md border border-neutral-200 shadow-sm">
                {/* Full Name */}
                <div>
                  <label className="block text-[16px] md:text-[18px] font-bold mb-1 text-neutral-800">
                    পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[16px] md:text-[18px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-[16px] md:text-[18px] font-bold mb-1 text-neutral-800">
                    মোবাইল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="আপনার ১১ ডিজিটের মোবাইল নাম্বার"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[16px] md:text-[18px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-[16px] md:text-[18px] font-bold mb-1 text-neutral-800">
                    হোয়াটসঅ্যাপ নাম্বার (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="প্রবাসীদের জন্য প্রযোজ্য"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[16px] md:text-[18px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  />
                </div>

                {/* District Selection */}
                <div>
                  <label className="block text-[16px] md:text-[18px] font-bold mb-1 text-neutral-800">
                    আপনার জেলা <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[16px] md:text-[18px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
                  >
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

                {/* Full Address */}
                <div>
                  <label className="block text-[16px] md:text-[18px] font-bold mb-1 text-neutral-800">
                    পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="গ্রাম/এলাকা, থানা, জেলা"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2.5 text-[16px] md:text-[18px] outline-none focus:border-[#009e19] focus:ring-1 focus:ring-[#009e19] transition-all bg-white"
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
            <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight mb-4 text-neutral-900">
              অর্ডার সামারি
            </h2>

            <div className="border border-neutral-200 rounded-lg p-1 bg-white shadow-sm">
              {/* Product Table Header */}
              <div className="flex justify-between text-[16px] md:text-[18px] font-bold pb-3 pt-2 border-b border-dashed border-neutral-200 px-3">
                <span className="text-neutral-600">Product</span>
                <span className="text-neutral-600">Subtotal</span>
              </div>

              {/* Product Item Row */}
              {selectedProductData && (
                <div className="py-4 border-b border-dashed border-neutral-200 px-3">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="h-16 w-16 flex-shrink-0 bg-white rounded overflow-hidden border border-neutral-200 flex items-center justify-center p-1">
                      <img 
                        src={selectedProductData.image ? (selectedProductData.image.startsWith('/uploads/') ? `http://localhost:5000${selectedProductData.image}` : selectedProductData.image) : "/banner-img/product-banner.webp"} 
                        alt="Product" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    {/* Product Details & Internal Pricing Breakdown */}
                    <div className="flex-1 flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-[16px] md:text-[18px] font-bold text-neutral-800 leading-tight">
                          {selectedProductData.title}
                        </p>
                        <p className="text-[14px] md:text-[16px] text-neutral-500 font-bold">Qty: {selectedProductQuantity}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[17px] md:text-[19px] font-bold text-neutral-900">
                          {Number(selectedProductData.price).toLocaleString()}৳
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Rows */}
              <div className="space-y-3 py-4 border-b border-dashed border-neutral-200 px-3 text-[16px] md:text-[18px]">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 font-bold">Subtotal</span>
                  <div className="text-right">
                    <span className="block font-bold text-neutral-900">{subtotal.toLocaleString()}.00৳</span>
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
              </div>

              {/* Submit Button */}
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded border border-red-200">
                  {errorMessage}
                </div>
              )}
              <button 
                onClick={handleSubmitOrder}
                disabled={isLoading || !selectedProductData}
                className={`w-full mt-4 bg-[#008000] hover:bg-[#006e00] text-white font-bold py-3.5 px-4 rounded transition-colors flex items-center justify-center gap-2 text-base shadow-sm ${isLoading || !selectedProductData ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Lock className="h-4 w-4 fill-current" />
                <span>{isLoading ? 'Processing...' : `Place Order ${totalPrice.toLocaleString()}.00৳`}</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}