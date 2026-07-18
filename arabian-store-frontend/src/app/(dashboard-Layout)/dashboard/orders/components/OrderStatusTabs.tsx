interface OrderStatusTabsProps {
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  setPage: (page: number) => void;
}

export default function OrderStatusTabs({
  filterStatus,
  setFilterStatus,
  setPage
}: OrderStatusTabsProps) {
  const statuses = ['All', 'PENDING', 'CONFIRMED', 'PACKAGING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED'];
  
  return (
    <div className="px-6 pb-0 bg-neutral-50/50">
      <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-4">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => {
              setFilterStatus(status);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border ${
              filterStatus === status 
                ? 'bg-[#008013] text-white border-[#008013] shadow-md shadow-[#008013]/20' 
                : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-800'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
