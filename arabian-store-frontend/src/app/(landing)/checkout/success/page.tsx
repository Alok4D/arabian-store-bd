"use client";

import { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '80850';
  const paymentMethod = searchParams.get('method') || 'COD';
  const productId = searchParams.get('product') || '3kg';
  const quantity = parseInt(searchParams.get('qty') || '1', 10);
  
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadPDF = async () => {
    const element = receiptRef.current;
    if (!element) return;

    try {
      setIsDownloading(true);
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        onclone: (document) => {
          const printLogo = document.getElementById('print-logo');
          if (printLogo) {
            printLogo.style.display = 'flex';
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      const yOffset = pdfHeight < pdf.internal.pageSize.getHeight() ? 10 : 0;

      pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, pdfHeight);
      pdf.save(`Receipt-${orderId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 text-[#222222] min-h-screen bg-white print:bg-white print:py-8">
      <div className="mx-auto max-w-4xl flex flex-col items-center px-4 print:px-8">
        
        {/* On-Screen Logo and Thank You Message (Hidden on Print) */}
        <div className="w-32 md:w-48 mb-6 print:hidden">
          <img src="/logo/navandfooterlogo.png" alt="Khejur Bari" className="w-full h-[100px] object-contain" />
        </div>
        
        <h1 className="text-4xl md:text-[45px] font-bold mb-3 text-black print:hidden">ধন্যবাদ</h1>
        <p className="text-lg md:text-[22px] font-medium text-neutral-600 mb-10 text-center print:hidden">
          খেজুর বাড়ি থেকে অর্ডার করার জন্য! আপনার অর্ডারটি কনফার্ম করা হয়েছে।
        </p>

        {/* Receipt Box (Main content for print/pdf) */}
        <div 
          ref={receiptRef}
          className="w-full max-w-3xl border border-neutral-200 rounded-lg p-6 md:p-10 text-left bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)] print:shadow-sm print:border print:border-neutral-300 print:p-10 print:max-w-3xl print:mx-auto print:my-4"
        >
          
          {/* Print-Only Logo (Visible only on Print/PDF) */}
          <div id="print-logo" className="hidden print:flex flex-col items-center mb-8 border-b border-dashed border-neutral-300 pb-8">
            <div className="flex justify-center h-[90px]">
              <img src="/logo/navandfooterlogo.png" alt="Khejur Bari" className="h-full w-auto" />
            </div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-neutral-800 text-center">Your order has been received.</h2>

          {/* Order Meta Info box */}
          <div className="bg-[#f9f9f9] print:bg-transparent print:border print:border-neutral-200 rounded-md p-4 md:p-6 grid grid-cols-2 md:flex md:flex-row gap-y-6 md:gap-0 text-sm text-neutral-600 mb-6">
            <div className="flex flex-col border-r border-neutral-300 pr-3 md:pr-8">
              <span className="font-medium mb-1">Order number:</span>
              <span className="font-bold text-neutral-900 break-all">{orderId}</span>
            </div>
            <div className="flex flex-col pl-4 md:px-8 md:border-r border-neutral-300">
              <span className="font-medium mb-1">Date:</span>
              <span className="font-bold text-neutral-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex flex-col border-r border-neutral-300 pr-3 md:px-8 md:border-r">
              <span className="font-medium mb-1">Total:</span>
              <span className="font-bold text-neutral-900">{totalPrice.toLocaleString()}.00৳</span>
            </div>
            <div className="flex flex-col pl-4 md:px-8">
              <span className="font-medium mb-1">Payment method:</span>
              <span className="font-bold text-neutral-900">{paymentMethod === 'COD' ? 'Cash on delivery' : 'bKash'}</span>
            </div>
          </div>

          {paymentMethod === 'COD' && (
            <p className="text-neutral-500 text-sm mb-10 print:mb-6">Pay with cash upon delivery.</p>
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

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4 w-full max-w-3xl print:hidden">
          <button 
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-white border-2 border-[#009e19] text-[#009e19] hover:bg-[#f0fdf4] disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3.5 px-8 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 text-[16px] md:text-[18px] w-full sm:flex-1"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#009e19]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ডাউনলোড হচ্ছে...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                পিডিএফ ডাউনলোড করুন
              </>
            )}
          </button>
          
          <Link 
            href="/" 
            className="bg-[#009e19] hover:bg-[#008a16] text-white font-bold py-3.5 px-8 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 text-[16px] md:text-[18px] w-full sm:flex-1"
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
