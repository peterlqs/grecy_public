"use client";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function LoadingSearchbar() {
  return (
    <div className="p-2 mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none absolute top-full left-0 right-0 transition duration-200 ease-in-out group-focus:visible opacity-100">
      {Array.from({ length: 5 }, (_, index) => (
        <Button
          key={index}
          variant={"ghost"}
          disabled={true}
          className="flex gap-2 mt-1 ml-0 pl-0 w-full justify-start"
        >
          <Skeleton className="rounded-lg border p-1 w-10 h-10" />
          <Skeleton className="grow h-full w-1/2" />
        </Button>
      ))}
    </div>
    // <div className="p-2 mt-1 rounded-md border bg-popover">HI</div>
  );
}
