import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Woolworths } from "@/lib/db/migrations/type";

export default function GroceryCard({
  item,
  index,
}: {
  item: Woolworths;
  index: number;
}) {
  return (
    <Card className="min-w-40 max-w-40">
      <CardContent className="relative flex flex-col items-start p-2 h-full overflow-hidden">
        <div className=" relative w-full">
          <Image
            src={item.imageUrl?.replace("medium", "small") || ""}
            alt={item.productName?.toString() ?? ""}
            width={300}
            height={300}
            className="rounded-lg border"
          />
          <a
            href={item.url?.toString() ?? ""}
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100"
            target="_blank"
          >
            <Button variant="outline" size="icon" className="mt-1">
              <Link />
            </Button>
          </a>
        </div>
        <div className="w-full flex justify-between">
          <div>
            <p className="text-lg font-bold">${item.price}</p>
            <p className="text-xs font-light">{item.cupString}</p>
          </div>
        </div>
        {!item.ingredients ? (
          <h4 className="text-sm my-1 text-start">{item.productName}</h4>
        ) : (
          <Popover>
            <PopoverTrigger>
              <h4 className="text-sm my-1 text-start">{item.productName}</h4>
            </PopoverTrigger>
            <PopoverContent>
              {item.ingredients && (
                <p className="text-xs">
                  <strong>Ingredients:</strong> {item.ingredients}
                  <br />
                  <strong>Allergen:</strong> {item.allergen}
                </p>
              )}
            </PopoverContent>
          </Popover>
        )}

        {!item.ingredients && (
          <div className="mt-auto bg-red-100 dark:bg-destructive p-1 rounded">
            <p className="text-xs font-light">No ingredients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
