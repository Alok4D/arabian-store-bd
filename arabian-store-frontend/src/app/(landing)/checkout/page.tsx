"use client";

import { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  
  const router = useRouter();
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
          const activeProducts = data.data.filter((p: any) => p.isActive);
          setProducts(activeProducts);
          setSelectedProduct(activeProducts[0]?.id || data.data[0].id);
          const initialQuantities: Record<string, number> = {};
          data.data.forEach((p: any) => { initialQuantities[p.id] = 1; });
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
          subtotal,
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
        setErrorMessage(data.message || 'অর্ডার করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  const inputClass = "w-full rounded-lg border border-[#D5C9B8] bg-white px-3 py-2.5 text-[15px] outline-none focus:border-[#008013] focus:ring-2 focus:ring-[#008013]/20 transition-all placeholder:text-[#BBB]";
  const labelClass = "block text-[14px] font-bold mb-1.5 text-[#2D251E]";

  if (loadingProducts) {
    return (
      <div className="px-4 py-8 md:px-8 lg:px-12 animate-pulse max-w-7xl mx-auto">
        <div className="h-8 w-64 bg-[#E8DFD0] rounded mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
            <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
            <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-64 bg-[#E8DFD0] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12 text-[#2D251E]" id="order">
      <div className="max-w-7xl mx-auto">

        {/* Section Header with Decorative Green Lines */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-r from-transparent to-[#008013]" />
          <h2 className="text-[20px] sm:text-2xl md:text-[28px] font-extrabold text-[#1A1A1A] text-center tracking-wide px-2">
            অর্ডার করতে ফর্ম পূরণ করুন
          </h2>
          <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-gradient-to-l from-transparent to-[#008013]" />
        </div>

        {/* Package Cards - Full Width Top Section */}
        <div className="mb-10 lg:mb-14">
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#2D251E] mb-4">যেকোনো একটি প্যাকেজ নির্বাচন করুন</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {products.map((product) => {
              const isSelected = selectedProduct === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product.id)}
                  className={`relative flex items-center gap-4 p-4 md:p-5 cursor-pointer transition-all bg-white rounded-md border ${isSelected ? 'border-[#008013] shadow-[0_0_5px_rgba(0,128,19,0.3)]' : 'border-[#d1d5db] hover:border-[#008013]/50'}`}
                >
                  {Number(product.shippingFee) === 0 && (
                    <div className="absolute right-0 top-0 bg-[#008013] text-white text-[11px] font-medium px-2 py-0.5 rounded-bl-md shadow-sm z-10">
                      ফ্রি ডেলিভারি
                    </div>
                  )}
                  {/* Radio */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#008013]' : 'border-[#9ca3af]'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#008013]" />}
                  </div>
                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white">
                    <img
                      src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-bannerr.jpeg"}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-bold text-[14px] md:text-[15px] text-[#333] mb-1 leading-snug">{product.title}</p>
                    <p className="text-[12px] md:text-[13px] text-[#777] leading-tight line-clamp-2">{product.description || "বিশেষ ডিসকাউন্ট অফার"}</p>
                  </div>
                  
                  {/* Qty + Price (Right Side) */}
                  <div className="flex flex-col items-end justify-center gap-2 flex-shrink-0 z-10 relative pl-1 sm:pl-2">
                    <div className="flex items-center border border-[#D5C9B8] rounded-md bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                      >−</button>
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 border-x border-[#D5C9B8] text-[13px] sm:text-[14px] font-bold text-[#2D251E] min-w-[28px] sm:min-w-[32px] text-center">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                      >+</button>
                    </div>
                    <span className="font-extrabold text-[15px] sm:text-[17px] md:text-[18px] text-[#1a6b2a] tracking-tight">{Number(product.price).toLocaleString()}৳</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT: Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* Delivery Details Form */}
            <div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#2D251E] mb-4">ডেলিভারি তথ্য</h3>
              <div className="bg-white rounded-xl border border-[#E8DFD0] p-4 md:p-5 shadow-sm space-y-4">
                <div>
                  <label className={labelClass}>পূর্ণ নাম <span className="text-red-500">*</span></label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="আপনার নাম লিখুন" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>মোবাইল নাম্বার <span className="text-red-500">*</span></label>
                  <input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="আপনার ১১ ডিজিটের মোবাইল নাম্বার" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>হোয়াটসঅ্যাপ নাম্বার (ঐচ্ছিক)</label>
                  <input type="text" value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} placeholder="প্রবাসীদের জন্য প্রযোজ্য" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>আপনার জেলা <span className="text-red-500">*</span></label>
                  <select value={district} onChange={e => setDistrict(e.target.value)} className={inputClass}>
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
                  <label className={labelClass}>পূর্ণ ঠিকানা <span className="text-red-500">*</span></label>
                  <input type="text" value={fullAddress} onChange={e => setFullAddress(e.target.value)} placeholder="গ্রাম/এলাকা, থানা, জেলা" className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <h3 className="text-[16px] font-bold text-[#2D251E] mb-3">আপনার অর্ডার</h3>
            <div className="bg-white rounded-xl border border-[#E8DFD0] shadow-sm overflow-hidden sticky top-20">

              {/* Selected Product Preview */}
              {selectedProductData && (
                <div className="p-4 border-b border-[#F0E8DC]">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#E8DFD0] flex-shrink-0">
                      <img
                        src={selectedProductData.image ? (selectedProductData.image.startsWith('/uploads/') ? `http://localhost:5000${selectedProductData.image}` : selectedProductData.image) : "/banner-img/product-bannerr.jpeg"}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-[15px] text-[#2D251E] leading-snug">{selectedProductData.title}</p>
                      <p className="text-[13px] text-[#888] mt-0.5">পরিমাণ: {selectedProductQuantity}</p>
                    </div>
                    <span className="font-extrabold text-[17px] text-[#1a6b2a]">{Number(selectedProductData.price).toLocaleString()}৳</span>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="p-4 space-y-2.5 border-b border-[#F0E8DC]">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#666] font-medium">সাবটোটাল</span>
                  <span className="font-bold text-[#2D251E]">{subtotal.toLocaleString()}.00৳</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#666] font-medium">ডেলিভারি চার্জ</span>
                  <span className="font-bold text-[#2D251E]">{deliveryCharge.toLocaleString()}.00৳</span>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-[#F0FBF4] border-b border-[#C5E8CD]">
                <span className="font-extrabold text-[17px] text-[#2D251E]">মোট</span>
                <span className="font-extrabold text-[22px] text-[#008013]">{totalPrice.toLocaleString()}.00৳</span>
              </div>

              {/* Payment Method */}
              <div className="p-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="h-4 w-4 accent-[#008013]"
                  />
                  <span className="font-bold text-[14px] text-[#2D251E]">ক্যাশ অন ডেলিভারি</span>
                </label>
                <div className="bg-[#F4F0E8] rounded-lg p-3 ml-7 text-[13px] text-[#666] font-medium border-l-4 border-[#C59B27]">
                  পণ্য হাতে পেয়ে ডেলিভারিম্যানকে টাকা বুঝিয়ে দিন।
                </div>

                {/* Security Badges */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[12px] text-[#666]">
                    <ShieldCheck className="w-4 h-4 text-[#008013]" />
                    <span>নিরাপদ অর্ডার</span>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] text-[#666]">
                    <Truck className="w-4 h-4 text-[#008013]" />
                    <span>দ্রুত ডেলিভারি</span>
                  </div>
                </div>
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="mx-4 mb-3 p-3 bg-red-50 text-red-600 text-[13px] font-medium rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading || !selectedProductData}
                  className={`w-full bg-[#008013] hover:bg-[#006810] text-white font-extrabold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-[16px] shadow-md hover:shadow-lg ${isLoading || !selectedProductData ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                >
                  <Lock className="h-4 w-4" />
                  <span>{isLoading ? 'প্রসেস হচ্ছে...' : `অর্ডার করুন — ${totalPrice.toLocaleString()}.00৳`}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}