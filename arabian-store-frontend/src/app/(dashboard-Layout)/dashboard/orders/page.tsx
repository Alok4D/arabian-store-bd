"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from "@/lib/feature/orders/ordersApi";
import Swal from 'sweetalert2';

import OrderFilters from "./components/OrderFilters";
import OrderStatusTabs from "./components/OrderStatusTabs";
import OrderTable from "./components/OrderTable";
import OrderPagination from "./components/OrderPagination";
import OrderSkeleton from "./components/OrderSkeleton";

export default function OrdersPage() {
  
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [dateRange, setDateRange] = useState('');
  const [amountRange, setAmountRange] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Handle Date Range
  const getDateRangeValues = () => {
    const today = new Date();
    let start, end;
    
    switch (dateRange) {
      case 'today':
        start = new Date(today.setHours(0,0,0,0));
        end = new Date(today.setHours(23,59,59,999));
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        start = new Date(yesterday.setHours(0,0,0,0));
        end = new Date(yesterday.setHours(23,59,59,999));
        break;
      case 'last7days':
        start = new Date();
        start.setDate(today.getDate() - 7);
        end = new Date();
        break;
      case 'last30days':
        start = new Date();
        start.setDate(today.getDate() - 30);
        end = new Date();
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date();
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
        break;
      default:
        start = undefined;
        end = undefined;
    }
    
    return {
      startDate: start ? start.toISOString() : undefined,
      endDate: end ? end.toISOString() : undefined,
    };
  };

  // Handle Amount Range
  useEffect(() => {
    switch (amountRange) {
      case 'under500':
        setMinAmount(''); setMaxAmount('500'); break;
      case '500to1000':
        setMinAmount('500'); setMaxAmount('1000'); break;
      case '1000to5000':
        setMinAmount('1000'); setMaxAmount('5000'); break;
      case 'above5000':
        setMinAmount('5000'); setMaxAmount(''); break;
      case 'custom':
        break;
      default:
        setMinAmount(''); setMaxAmount('');
    }
    setPage(1);
  }, [amountRange]);

  // Handle Sorting
  const getSortValues = () => {
    switch (sortOption) {
      case 'oldest': return { sortBy: 'date', sortOrder: 'asc' };
      case 'highestAmount': return { sortBy: 'amount', sortOrder: 'desc' };
      case 'lowestAmount': return { sortBy: 'amount', sortOrder: 'asc' };
      case 'customerAZ': return { sortBy: 'customer', sortOrder: 'asc' };
      case 'customerZA': return { sortBy: 'customer', sortOrder: 'desc' };
      case 'newest':
      default:
        return { sortBy: 'date', sortOrder: 'desc' };
    }
  };

  const { startDate, endDate } = getDateRangeValues();
  const { sortBy, sortOrder } = getSortValues();

  const { data, isLoading } = useGetOrdersQuery({
    page,
    limit: 10,
    status: filterStatus,
    search: debouncedSearch,
    startDate,
    endDate,
    minAmount: minAmount ? Number(minAmount) : undefined,
    maxAmount: maxAmount ? Number(maxAmount) : undefined,
    sortBy,
    sortOrder: sortOrder as 'asc'|'desc',
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  const resetFilters = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    setDateRange('');
    setAmountRange('');
    setMinAmount('');
    setMaxAmount('');
    setSortOption('newest');
    setFilterStatus('All');
    setPage(1);
  };

  const hasActiveFilters = searchQuery !== '' || dateRange !== '' || amountRange !== '' || sortOption !== 'newest' || filterStatus !== 'All';

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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#2D251E]">All Orders</h1>
      </div>

      <Card className="border border-neutral-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <CardHeader className="p-0 border-b border-neutral-100">
          <div className="p-6 pb-4">
            {/* <CardTitle className="text-[#2D251E] mb-6">Manage Orders</CardTitle> */}

            <OrderFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              dateRange={dateRange}
              setDateRange={setDateRange}
              amountRange={amountRange}
              setAmountRange={setAmountRange}
              sortOption={sortOption}
              setSortOption={setSortOption}
              setPage={setPage}
              minAmount={minAmount}
              setMinAmount={setMinAmount}
              maxAmount={maxAmount}
              setMaxAmount={setMaxAmount}
              resetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
          
          <OrderStatusTabs 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            setPage={setPage}
          />
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <OrderSkeleton />
          ) : orders.length === 0 ? (
            <div className="py-8 text-center text-neutral-500">No orders found matching your filters.</div>
          ) : (
            <>
              <OrderTable 
                orders={orders}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
              />
              <OrderPagination 
                meta={meta}
                page={page}
                setPage={setPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
