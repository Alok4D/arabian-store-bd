"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useGetOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from "@/lib/feature/orders/ordersApi";
import Swal from 'sweetalert2';

interface Order {
  id: string;
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address?: string;
  product?: { title: string };
  quantity: number;
  total: number;
  status: string;
}

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetOrdersQuery({ page, limit: 10 });
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  
  const orders: Order[] = data?.data || [];
  const meta = data?.meta;

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await updateOrderStatus({ id, status: newStatus }).unwrap();
      if (!res.success) {
        Swal.fire('Error!', 'Failed to update status', 'error');
      } else {
        Swal.fire({
          title: 'Updated!',
          text: 'Order status updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire('Error!', 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this order? This cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteOrder(id).unwrap();
        if (!res.success) {
          Swal.fire('Error!', 'Failed to delete order', 'error');
        } else {
          Swal.fire('Deleted!', 'The order has been deleted.', 'success');
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire('Error!', 'Failed to delete order', 'error');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PACKAGING': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D251E]">Orders</h1>
      </div>

      <Card className="border-[#faecd8]">
        <CardHeader>
          <CardTitle className="text-[#2D251E]">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-neutral-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Order ID</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Customer</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Product</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Total</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-neutral-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-neutral-700">{order.orderId}</td>
                      <td className="py-4 px-4 text-sm text-neutral-500 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-neutral-800">{order.customerName}</div>
                        <div className="text-xs text-neutral-500">{order.phone}</div>
                        {/* <div className="text-xs text-neutral-400 max-w-[150px] truncate" title={order.address}>{order.address}</div> */}
                      </td>
                      <td className="py-4 px-4 text-sm">
                        <span className="font-medium">{order.product?.title || 'Unknown Product'}</span>
                        <span className="text-neutral-500 ml-1">x{order.quantity}</span>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#008013]">{Number(order.total).toLocaleString()}৳</td>
                      <td className="py-4 px-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs font-bold py-1.5 px-3 rounded-full border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PACKAGING">PACKAGING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-neutral-100 mt-4">
                  <div className="text-sm text-neutral-500">
                    Showing page <span className="font-medium text-neutral-900">{meta.page}</span> of <span className="font-medium text-neutral-900">{meta.totalPages}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-3 py-1 text-sm font-medium border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                      disabled={page === meta.totalPages}
                      className="px-3 py-1 text-sm font-medium border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
