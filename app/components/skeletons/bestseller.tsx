import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Bestseller = () => {
  return (
    <div className="dark flex flex-col gap-2.5">
      <Skeleton className="w-[334px] h-[400px]" />
      <div className="flex items-center justify-between px-5">
        <Skeleton className="w-1/2" /> <Skeleton className="w-1/5" />
      </div>
    </div>
  );
};

export default Bestseller;
