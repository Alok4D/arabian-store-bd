"use client";

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetProductsQuery } from '@/lib/feature/products/productsApi';
import { useGetShippingQuery } from '@/lib/feature/shipping/shippingApi';
import { useCreateOrderMutation } from '@/lib/feature/orders/ordersApi';

export default function CheckoutPage() {

  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [district, setDistrict] = useState('ঢাকা');
  const [shippingSettings, setShippingSettings] = useState({ insideDhaka: 80, outsideDhaka: 130 });
  const [fullAddress, setFullAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery({});
  const { data: shippingData } = useGetShippingQuery({});
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  useEffect(() => {
    if (productsData?.success && productsData?.data?.length > 0) {
      const activeProducts = productsData.data.filter((p: any) => p.isActive);
      setProducts(activeProducts);
      if (activeProducts.length > 0 && !selectedProduct) {
        setSelectedProduct(activeProducts[0].id);
      }
      
      const initialQuantities: Record<string, number> = {};
      productsData.data.forEach((p: any) => { initialQuantities[p.id] = 1; });
      // Only set if quantities is empty to preserve user changes
      if (Object.keys(quantities).length === 0) {
        setQuantities(initialQuantities);
      }
    }
  }, [productsData]);

  useEffect(() => {
    if (shippingData?.success && shippingData?.data) {
      setShippingSettings({
        insideDhaka: Number(shippingData.data.insideDhaka),
        outsideDhaka: Number(shippingData.data.outsideDhaka)
      });
    }
  }, [shippingData]);

  useEffect(() => {
    const handlePackageSelection = (e: CustomEvent) => {
      if (e.detail) {
        setSelectedProduct(e.detail);
      }
    };
    window.addEventListener('selectPackage', handlePackageSelection as EventListener);
    return () => {
      window.removeEventListener('selectPackage', handlePackageSelection as EventListener);
    };
  }, []);

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const selectedProductPrice = selectedProductData ? Number(selectedProductData.discountPrice || selectedProductData.price) : 0;
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
    try {
      const data = await createOrder({
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
      }).unwrap();
      
      if (data.success) {
        router.push(`/checkout/success?orderId=${data.data.orderId}&method=${paymentMethod}&product=${selectedProductData?.title}&qty=${selectedProductQuantity}`);
      } else {
        setErrorMessage(data.message || 'অর্ডার করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.data?.message || 'সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।');
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
                  className={`relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 md:p-5 cursor-pointer transition-all bg-white rounded-md border ${isSelected ? 'border-[#008013] shadow-[0_0_5px_rgba(0,128,19,0.3)]' : 'border-[#d1d5db] hover:border-[#008013]/50'}`}
                >
                  {Number(product.shippingFee) === 0 && (
                    <div className="absolute right-0 top-0 bg-[#008013] text-white text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-bl-md shadow-sm z-10">
                      ফ্রি ডেলিভারি
                    </div>
                  )}
                  {/* Radio */}
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-[#008013]' : 'border-[#9ca3af]'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#008013]" />}
                  </div>
                  {/* Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 bg-white">
                    <img
                      src={product.image ? (product.image.startsWith('/uploads/') ? `http://localhost:5000${product.image}` : product.image) : "/banner-img/product-bannerr.jpeg"}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="font-bold text-[13px] sm:text-[14px] md:text-[15px] text-[#333] mb-0.5 md:mb-1 leading-snug truncate whitespace-normal line-clamp-2">{product.title}</p>
                    <p className="text-[11px] sm:text-[12px] md:text-[13px] text-[#777] leading-tight line-clamp-2">{product.description || "বিশেষ ডিসকাউন্ট অফার"}</p>
                  </div>

                  {/* Qty + Price (Right Side) */}
                  <div className="flex flex-col items-end justify-center gap-1.5 sm:gap-2 flex-shrink-0 z-10 relative pl-0 sm:pl-2">
                    <div className="flex items-center border border-[#D5C9B8] rounded-md bg-white overflow-hidden shadow-sm">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, -1); }}
                        className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                      >−</button>
                      <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 border-x border-[#D5C9B8] text-[12px] sm:text-[14px] font-bold text-[#2D251E] min-w-[24px] sm:min-w-[32px] text-center">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleQuantityChange(product.id, 1); }}
                        className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[#555] hover:bg-[#F4F0E8] text-sm sm:text-base font-bold transition-colors"
                      >+</button>
                    </div>
                    {product.discountPrice ? (
                      <div className="flex flex-col items-end leading-none mt-1">
                        <span className="font-extrabold text-[14px] sm:text-[17px] md:text-[18px] text-[#1a6b2a] tracking-tight">{Number(product.discountPrice).toLocaleString()}৳</span>
                        <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">{Number(product.price).toLocaleString()}৳</span>
                      </div>
                    ) : (
                      <span className="font-extrabold text-[14px] sm:text-[17px] md:text-[18px] text-[#1a6b2a] tracking-tight mt-1">{Number(product.price).toLocaleString()}৳</span>
                    )}
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

              <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#2c3e50] mt-10 mb-4">Shipping</h3>
              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] border border-[#e5e7eb] text-[14px] text-[#555]">
                <span>সারাদেশে ডেলিভারি চার্জ:</span>
                <span className="font-medium">৳ {deliveryCharge}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
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

              {/* Delivery Charge */}
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

        </div>
      </div>
    </div>
  );
}