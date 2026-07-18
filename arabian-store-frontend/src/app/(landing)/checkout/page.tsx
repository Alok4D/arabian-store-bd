"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductsQuery } from '@/lib/feature/products/productsApi';
import { useGetShippingQuery } from '@/lib/feature/shipping/shippingApi';
import { useCreateOrderMutation } from '@/lib/feature/orders/ordersApi';
import PackageSelection from './components/PackageSelection';
import BillingForm from './components/BillingForm';
import OrderSummary from './components/OrderSummary';

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
      let activeProducts = productsData.data.filter((p: any) => p.isActive);
      
      // Sort by weight (ascending)
      const getWeight = (title: string) => {
        if (!title) return 999;
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        const englishTitle = title.replace(/[০-৯]/g, w => bengaliDigits.indexOf(w).toString());
        const match = englishTitle.match(/(\d+(?:\.\d+)?)\s*(kg|কেজি|গ্রাম|gm|g)/i);
        return match ? parseFloat(match[1]) : 999;
      };

      activeProducts.sort((a: any, b: any) => getWeight(a.title) - getWeight(b.title));

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
        whatsapp: mobileNumber,
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
    setSelectedProduct(id);
  };

  const inputClass = "w-full rounded-lg border border-[#D5C9B8] bg-white px-3 py-2.5 text-[15px] outline-none focus:border-[#008013] focus:ring-2 focus:ring-[#008013]/20 transition-all placeholder:text-[#BBB]";
  const labelClass = "block text-[14px] font-bold mb-1.5 text-[#2D251E]";

  if (loadingProducts) {
    return (
      <div className="px-4 py-8 md:px-8 lg:px-12 text-[#2D251E] scroll-mt-20" id="order">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-pulse">
            <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-[#E8DFD0]" />
            <div className="h-8 w-48 sm:w-64 bg-[#E8DFD0] rounded"></div>
            <div className="flex-1 max-w-[40px] sm:max-w-[60px] md:max-w-[100px] h-[1px] md:h-[2px] bg-[#E8DFD0]" />
          </div>

          <PackageSelection
            products={[]}
            selectedProduct=""
            setSelectedProduct={() => {}}
            quantities={{}}
            handleQuantityChange={() => {}}
            isLoading={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
              <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
              <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
              <div className="h-12 bg-[#E8DFD0] rounded-lg"></div>
              <div className="h-24 bg-[#E8DFD0] rounded-lg"></div>
            </div>
            <div className="lg:col-span-5">
              <div className="h-[400px] bg-[#E8DFD0] rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 md:px-8 lg:px-12 text-[#2D251E] scroll-mt-20" id="order">
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
        <PackageSelection
          products={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          quantities={quantities}
          handleQuantityChange={handleQuantityChange}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT: Form */}
          <div className="lg:col-span-7 space-y-6">
            <BillingForm
              fullName={fullName}
              setFullName={setFullName}
              district={district}
              setDistrict={setDistrict}
              fullAddress={fullAddress}
              setFullAddress={setFullAddress}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              deliveryCharge={deliveryCharge}
            />
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary
              selectedProductData={selectedProductData}
              quantities={quantities}
              selectedProduct={selectedProduct}
              subtotal={subtotal}
              totalPrice={totalPrice}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              errorMessage={errorMessage}
              handleSubmitOrder={handleSubmitOrder}
              isCreatingOrder={isCreatingOrder}
              deliveryCharge={deliveryCharge}
            />
          </div>
        </div>
      </div>
    </div>
  );
}