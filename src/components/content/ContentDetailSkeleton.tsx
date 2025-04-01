
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ContentDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton className="h-9 w-20" />
      </div>
      <Skeleton className="mb-6 h-64 w-full rounded-xl md:h-80" />
      <div className="mb-8 flex gap-4">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Skeleton className="mb-4 h-8 w-40" />
          <Skeleton className="mb-6 h-24 w-full" />
          <Skeleton className="mb-4 h-8 w-40" />
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ContentDetailSkeleton;
