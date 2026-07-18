import { Trash2 } from "lucide-react";

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

interface OrderTableProps {
  orders: Order[];
  handleStatusChange: (id: string, newStatus: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}

export default function OrderTable({ orders, handleStatusChange, handleDelete }: OrderTableProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PACKAGING': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      case 'RETURNED': return 'bg-gray-200 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailableStatuses = (currentStatus: string) => {
    const progression = ['PENDING', 'CONFIRMED', 'PACKAGING', 'SHIPPED', 'DELIVERED'];
    
    if (currentStatus === 'CANCELLED') return ['CANCELLED'];
    if (currentStatus === 'RETURNED') return ['RETURNED'];
    if (currentStatus === 'DELIVERED') return ['DELIVERED', 'RETURNED'];
    
    const currentIndex = progression.indexOf(currentStatus);
    
    if (currentIndex === -1) {
      return ['PENDING', 'CONFIRMED', 'PACKAGING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
    }
    
    const allowed = progression.slice(currentIndex);
    allowed.push('CANCELLED', 'RETURNED');
    return allowed;
  };

  return (
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
                  {getAvailableStatuses(order.status).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
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
    </div>
  );
}
