import { Skeleton } from '@/components/ui/skeleton'

const SkeletonProductCard = () => (
  <div className="flex flex-col overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
)

export default SkeletonProductCard