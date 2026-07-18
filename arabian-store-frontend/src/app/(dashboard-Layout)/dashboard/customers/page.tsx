"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, Trash2 } from "lucide-react";
import { useGetCustomersQuery, useDeleteCustomerMutation } from "@/lib/feature/customers/customersApi";

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
  const [deleteCustomer] = useDeleteCustomerMutation();
  const customers = data?.data || [];

  const handleDelete = async (phone: string, name: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete the customer <b>${name}</b>.<br/> <span style="color:red">Warning: This will permanently delete all orders associated with this customer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!'
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCustomer(phone).unwrap();
        if (response.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Customer and their orders have been deleted.',
            icon: 'success',
            confirmButtonColor: '#008013',
            timer: 2000
          });
        }
      } catch (error: any) {
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to delete customer',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D251E] flex items-center gap-2">
          <UserIcon className="w-8 h-8" /> Customers
        </h1>
      </div>

      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#2D251E]">All Customers</CardTitle>
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
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-center">Action</th>
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
                      <td className="py-4 px-4 text-right font-bold text-[#008013]">
                        {Number(customer.totalSpent).toLocaleString('bn-BD')} ৳
                      </td>
                      <td className="py-4 px-4 text-right text-sm text-neutral-500">
                        {new Date(customer.lastOrderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleDelete(customer.phone, customer.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
