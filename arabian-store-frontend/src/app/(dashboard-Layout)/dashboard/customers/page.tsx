"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { useGetCustomersQuery } from "@/lib/feature/customers/customersApi";

interface Customer {
  id: string | number;
  name: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number | string;
  lastOrderDate: string;
}

export default function CustomersPage() {
  const { data, isLoading } = useGetCustomersQuery({});
  const customers = data?.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#a46404] flex items-center gap-2">
          <UserIcon className="w-8 h-8" /> Customers
        </h1>
      </div>

      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#a46404]">All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-neutral-500">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">No customers found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Customer Name</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Phone</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Address</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-center">Total Orders</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-right">Total Spent</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-right">Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer: Customer) => (
                    <tr key={customer.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-neutral-800">{customer.name}</td>
                      <td className="py-4 px-4 text-neutral-600 font-medium">{customer.phone}</td>
                      <td className="py-4 px-4 text-sm text-neutral-500 max-w-[200px] truncate" title={customer.address}>
                        {customer.address}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-[#009e19]">
                        {Number(customer.totalSpent).toLocaleString('bn-BD')} ৳
                      </td>
                      <td className="py-4 px-4 text-right text-sm text-neutral-500">
                        {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
