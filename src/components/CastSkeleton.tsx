import type { FC } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const CastSkeleton: FC = () => {
  return (
    <div className="border-[#272B30] border-2 rounded-md p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-400">
      <div className="flex gap-2 items-center">
        <Skeleton className="rounded-full w-9 h-9" />
        <Skeleton className="w-20 h-4" />
      </div>

      <Skeleton className="h-14 mt-8" />
    </div>
  );
};
