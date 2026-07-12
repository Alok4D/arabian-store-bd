"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Package, Users, DollarSign } from "lucide-react";
import { useGetOverviewQuery } from "@/lib/feature/dashboard/dashboardApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  
  const [overview, setOverview] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    graphData: []
  });
  const { data, isLoading } = useGetOverviewQuery({});
  
  useEffect(() => {
    if (data?.success) {
      setOverview(data.data);
    }
  }, [data]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#a46404]">Overview</h1>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-neutral-200 rounded" />
                  <div className="h-4 w-4 bg-neutral-200 rounded-full" />
                </div>
                <div className="h-8 w-16 bg-neutral-100 rounded" />
                <div className="h-3 w-32 bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
            <div className="col-span-4 border border-neutral-200 rounded-xl p-6 space-y-4">
              <div className="h-5 w-40 bg-neutral-200 rounded" />
              <div className="h-[280px] w-full bg-neutral-100 rounded" />
            </div>
            <div className="col-span-3 border border-neutral-200 rounded-xl p-6 space-y-4">
              <div className="h-5 w-48 bg-neutral-200 rounded mb-6" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center border-b pb-3 border-neutral-50 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-neutral-200" />
                    <div className="h-4 w-20 bg-neutral-200 rounded" />
                  </div>
                  <div className="h-4 w-8 bg-neutral-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#faecd8] bg-[#fcf8f2]/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-[#009e19]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-800">৳{overview.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-neutral-500 mt-1">From all non-cancelled orders</p>
              </CardContent>
            </Card>
            
            <Card className="border-[#faecd8] bg-[#fcf8f2]/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Orders</CardTitle>
                <Receipt className="h-4 w-4 text-[#009e19]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-800">{overview.totalOrders}</div>
                <p className="text-xs text-[#009e19] mt-1">{overview.pendingOrders} Pending</p>
              </CardContent>
            </Card>
            
            <Card className="border-[#faecd8] bg-[#fcf8f2]/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Products</CardTitle>
                <Package className="h-4 w-4 text-[#009e19]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-800">{overview.totalProducts}</div>
                <p className="text-xs text-neutral-500 mt-1">Active products</p>
              </CardContent>
            </Card>
            
            <Card className="border-[#faecd8] bg-[#fcf8f2]/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-neutral-600">Delivered</CardTitle>
                <Users className="h-4 w-4 text-[#009e19]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neutral-800">{overview.deliveredOrders}</div>
                <p className="text-xs text-neutral-500 mt-1">Successfully delivered</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
            <Card className="col-span-4 border-[#faecd8]">
              <CardHeader>
                <CardTitle className="text-[#a46404]">Revenue (Last 7 Days)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {overview.graphData && overview.graphData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overview.graphData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dx={-10} tickFormatter={(val) => `৳${val}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [`৳${value}`, 'Revenue']}
                        labelStyle={{ color: '#888', marginBottom: '4px' }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#009e19" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-neutral-500">
                    No data available for the last 7 days.
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-3 border-[#faecd8]">
              <CardHeader>
                <CardTitle className="text-[#a46404]">Order Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b pb-3 border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-neutral-600 font-medium">Pending</span>
                  </div>
                  <span className="font-bold text-neutral-800">{overview.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3 border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-neutral-600 font-medium">Confirmed</span>
                  </div>
                  <span className="font-bold text-neutral-800">{overview.confirmedOrders}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3 border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-neutral-600 font-medium">Delivered</span>
                  </div>
                  <span className="font-bold text-neutral-800">{overview.deliveredOrders}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-neutral-600 font-medium">Cancelled</span>
                  </div>
                  <span className="font-bold text-neutral-800">{overview.cancelledOrders}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
