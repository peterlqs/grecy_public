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
import GroceryRecommendation from "./GroceryRecommendation";
import { set } from "zod";
import { max } from "drizzle-orm";
import GroceryCard from "./GroceryCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface GroceryListData {
  department: string;
  items: Woolworths[];
}

interface GroceryData {
  ingredient: string;
  departments: GroceryListData[];
  maxItemCountDepartment: string;
  maxIngredientCountDepartment: string;
}

interface GroceryListProps {
  groceryData: GroceryData[]; // Define the groceryData prop
}

export default function GroceryRow({
  departments,
  maxItemCountDepartment,
}: {
  departments: GroceryListData[];
  maxItemCountDepartment: string;
}) {
  const [currentTab, setCurrentTab] = useState(maxItemCountDepartment);
  useEffect(() => {
    setCurrentTab(maxItemCountDepartment);
  }, [maxItemCountDepartment]);

  return (
    <Tabs
      //   defaultValue={currentTab}. IDK why this doesn't work
      value={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value);
      }}
    >
      <ScrollArea>
        <TabsList>
          {departments.map(
            ({ department }, departmentIndex) =>
              department && (
                <TabsTrigger
                  key={departmentIndex}
                  value={department}
                  className="capitalize border"
                >
                  {department.toLowerCase()}
                </TabsTrigger>
              )
          )}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {departments.map(({ department, items }, departmentIndex) => (
        <TabsContent key={departmentIndex} value={department}>
          <ScrollArea>
            <div className="flex flex-nowrap overflow-x-auto gap-2">
              {items.map((item: Woolworths, id: number) => (
                <GroceryCard item={item} index={id} key={id} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
