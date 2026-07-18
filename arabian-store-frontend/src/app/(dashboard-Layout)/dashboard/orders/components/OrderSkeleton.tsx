
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="py-3 px-4"><Skeleton className="h-4 w-16" /></th>
            <th className="py-3 px-4"><Skeleton className="h-4 w-24" /></th>
            <th className="py-3 px-4"><Skeleton className="h-4 w-32" /></th>
            <th className="py-3 px-4"><Skeleton className="h-4 w-40" /></th>
            <th className="py-3 px-4"><Skeleton className="h-4 w-16" /></th>
            <th className="py-3 px-4"><Skeleton className="h-4 w-20" /></th>
            <th className="py-3 px-4 text-right"><Skeleton className="h-4 w-10 ml-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-neutral-100">
              <td className="py-4 px-4"><Skeleton className="h-5 w-20" /></td>
              <td className="py-4 px-4"><Skeleton className="h-4 w-32" /></td>
              <td className="py-4 px-4">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-3 w-24" />
              </td>
              <td className="py-4 px-4">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-8" />
              </td>
              <td className="py-4 px-4"><Skeleton className="h-5 w-16" /></td>
              <td className="py-4 px-4"><Skeleton className="h-8 w-24 rounded-full" /></td>
              <td className="py-4 px-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
