import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-8 h-8 text-gray-800" />
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Management</h2>
        <p className="text-gray-500 max-w-md">This page is under construction. Soon you will be able to manage all your orders here.</p>
      </div>
    </div>
  );
}
