"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Package, Users, DollarSign } from "lucide-react";
import { useGetOverviewQuery } from "@/lib/feature/dashboard/dashboardApi";

export default function DashboardPage() {
  const [overview, setOverview] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0
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
        <div className="text-center py-12 text-neutral-500">Loading metrics...</div>
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
                <CardTitle className="text-[#a46404]">Order Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-neutral-600 font-medium">Pending</span>
                  <span className="font-bold text-neutral-800">{overview.pendingOrders}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-neutral-600 font-medium">Confirmed</span>
                  <span className="font-bold text-neutral-800">{overview.confirmedOrders}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-neutral-600 font-medium">Delivered</span>
                  <span className="font-bold text-neutral-800">{overview.deliveredOrders}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-neutral-600 font-medium">Cancelled</span>
                  <span className="font-bold text-neutral-800">{overview.cancelledOrders}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3 border-[#faecd8]">
              <CardHeader>
                <CardTitle className="text-[#a46404]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center text-neutral-500">
                Data synced from API.
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
