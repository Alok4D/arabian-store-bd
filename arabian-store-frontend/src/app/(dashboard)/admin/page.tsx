"use client";

import React, { useEffect, useState } from 'react';
import { Package, RefreshCw, Phone, MapPin, TrendingUp, ShoppingBag, Users, Activity } from 'lucide-react';
import Cookies from 'js-cookie';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button 
          onClick={fetchOrders}
          disabled={isLoading}
          className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          // Skeleton Cards matching the image
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 animate-pulse">
              <div className="w-1/2 h-4 bg-gray-200 rounded-full mb-4"></div>
              <div className="w-3/4 h-8 bg-gray-200 rounded-full"></div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800">৳{totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><ShoppingBag className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-800">{pendingOrders}</p>
                </div>
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Package className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Active Customers</p>
                  <p className="text-3xl font-bold text-gray-800">{new Set(orders.map(o => o.phoneNumber)).size}</p>
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Users className="w-6 h-6" /></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-gray-800">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID / Date</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Payment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                // Table Skeletons
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded-full w-24 mb-2"></div><div className="h-3 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded-full w-32 mb-2"></div><div className="h-3 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-5"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-gray-200 rounded-full w-20"></div></td>
                    <td className="px-6 py-5"><div className="h-6 bg-gray-200 rounded-full w-16"></div></td>
                    <td className="px-6 py-5"><div className="h-8 bg-gray-200 rounded-full w-24"></div></td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 mb-1">#{order.id.slice(0, 8)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800 mb-1">{order.customerName}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                        <Phone className="w-3 h-3" /> {order.phoneNumber}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {order.district ? `${order.district}, ` : ''}{order.fullAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.packageType}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {order.totalAmount.toLocaleString()} ৳
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${order.paymentMethod === 'BKASH' ? 'bg-pink-100 text-pink-800' : 'bg-green-100 text-green-800'}`}>
                        {order.paymentMethod === 'BKASH' ? 'bKash' : 'COD'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className={`text-xs font-bold rounded-full px-3 py-1.5 outline-none border cursor-pointer ${order.status === 'PENDING' ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}
                        defaultValue={order.status}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
