import { Search } from "lucide-react";

interface OrderFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  dateRange: string;
  setDateRange: (val: string) => void;
  amountRange: string;
  setAmountRange: (val: string) => void;
  sortOption: string;
  setSortOption: (val: string) => void;
  setPage: (page: number) => void;
  minAmount: string;
  setMinAmount: (val: string) => void;
  maxAmount: string;
  setMaxAmount: (val: string) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

export default function OrderFilters({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  amountRange,
  setAmountRange,
  sortOption,
  setSortOption,
  setPage,
  minAmount,
  setMinAmount,
  maxAmount,
  setMaxAmount,
  resetFilters,
  hasActiveFilters,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Search and Primary Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative w-full lg:w-[320px] flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search by ID, Customer Name, Phone, or Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#008013]/20 focus:border-[#008013] transition-all"
          />
        </div>
        
        {/* Secondary Filters row */}
        <div className="flex flex-wrap items-center gap-3 w-full justify-start lg:justify-end">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 focus-within:border-[#008013] focus-within:ring-2 focus-within:ring-[#008013]/20 transition-all flex-grow lg:flex-grow-0">
            <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap">Date:</span>
            <select 
              value={dateRange} 
              onChange={(e) => { setDateRange(e.target.value); setPage(1); }}
              className="text-sm bg-transparent outline-none text-neutral-700 font-medium py-1 cursor-pointer w-full"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 focus-within:border-[#008013] focus-within:ring-2 focus-within:ring-[#008013]/20 transition-all flex-grow lg:flex-grow-0">
            <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap">Amount:</span>
            <select 
              value={amountRange} 
              onChange={(e) => setAmountRange(e.target.value)}
              className="text-sm bg-transparent outline-none text-neutral-700 font-medium py-1 cursor-pointer w-full"
            >
              <option value="">Any</option>
              <option value="under500">Under ৳500</option>
              <option value="500to1000">৳500 - ৳1000</option>
              <option value="1000to5000">৳1000 - ৳5000</option>
              <option value="above5000">Above ৳5000</option>
              <option value="custom">Custom...</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 focus-within:border-[#008013] focus-within:ring-2 focus-within:ring-[#008013]/20 transition-all flex-grow lg:flex-grow-0">
            <span className="text-xs font-semibold text-neutral-500 whitespace-nowrap">Sort:</span>
            <select 
              value={sortOption} 
              onChange={(e) => { setSortOption(e.target.value); setPage(1); }}
              className="text-sm bg-transparent outline-none text-neutral-700 font-medium py-1 cursor-pointer w-full"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highestAmount">Highest Amount</option>
              <option value="lowestAmount">Lowest Amount</option>
              <option value="customerAZ">Customer (A-Z)</option>
              <option value="customerZA">Customer (Z-A)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button 
              onClick={resetFilters}
              className="text-sm px-4 py-2 font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors whitespace-nowrap border border-transparent hover:border-red-100"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Custom Amount Inputs (shows only if 'custom' is selected) */}
      {amountRange === 'custom' && (
        <div className="flex items-center gap-3 pt-2 animate-in fade-in slide-in-from-top-2">
          <span className="text-xs font-medium text-neutral-500">Custom Range:</span>
          <input type="number" placeholder="Min ৳" value={minAmount} onChange={e => { setMinAmount(e.target.value); setPage(1); }} className="w-24 text-sm py-1.5 px-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-[#008013] focus:ring-2 focus:ring-[#008013]/20 transition-colors" />
          <span className="text-neutral-400">-</span>
          <input type="number" placeholder="Max ৳" value={maxAmount} onChange={e => { setMaxAmount(e.target.value); setPage(1); }} className="w-24 text-sm py-1.5 px-3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-[#008013] focus:ring-2 focus:ring-[#008013]/20 transition-colors" />
        </div>
      )}
    </div>
  );
}
