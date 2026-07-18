interface OrderPaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | undefined;
  page: number;
  setPage: (val: number | ((prev: number) => number)) => void;
}

export default function OrderPagination({ meta, page, setPage }: OrderPaginationProps) {
  if (!meta || meta.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-neutral-100 mt-4">
      <div className="text-sm text-neutral-500">
        Showing page <span className="font-medium text-neutral-900">{meta.page}</span> of <span className="font-medium text-neutral-900">{meta.totalPages}</span> ({meta.total} total items)
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setPage((p: number) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 text-sm font-medium border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p: number) => Math.min(meta.totalPages, p + 1))}
          disabled={page === meta.totalPages}
          className="px-3 py-1 text-sm font-medium border border-neutral-200 rounded text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
