import React from "react";
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
import GroceryRecommendation from "./GroceryRecommendation";
import { set } from "zod";
import { max } from "drizzle-orm";
import GroceryRow from "./GroceryRow";
import { Coles } from "@/lib/db/migrations/type";

interface GroceryListData {
  department: string;
  items: Coles[];
}

interface GroceryData {
  ingredient: string;
  departments: GroceryListData[];
  maxItemCountDepartment: string;
  maxIngredientCountDepartment: string;
  store: string;
}

interface GroceryListProps {
  groceryData: GroceryData[]; // Define the groceryData prop
}

export default function GroceryList({ groceryData }: GroceryListProps) {
  const notFoundIngredients = groceryData.filter(
    ({ departments }) => departments.length == 0
  );

  if (groceryData.length == 0) {
    return;
  }

  // Set the search URL based the store
  // const isWoolworths =
  //   groceryData[0].departments[0].items[0].url?.includes("woolworths");
  let searchUrl = `https://www.coles.com.au/search/products?q=`;
  if (groceryData[0].store == "woolworths") {
    searchUrl = `https://www.woolworths.com.au/shop/search/products?searchTerm=`;
  }

  return (
    <div>
      <GroceryRecommendation
        groceryData={groceryData}
        notFoundIngredients={notFoundIngredients}
      />
      <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">All items</h2>
      {groceryData.map(
        (
          {
            ingredient,
            departments,
            maxItemCountDepartment,
            maxIngredientCountDepartment,
          },
          ingredientIndex
        ) => (
          <Card key={ingredientIndex} className="p-4 mb-2">
            <div className="">
              <div className="flex flex-row gap-2">
                <a
                  href={`${searchUrl + ingredient}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {ingredient}
                  </h2>{" "}
                </a>
              </div>
              {departments.length == 0 && (
                <div className="">
                  <p className="text-xs font-light">No product found</p>
                </div>
              )}

              <GroceryRow
                departments={departments}
                maxItemCountDepartment={maxItemCountDepartment}
              />
            </div>
          </Card>
        )
      )}
    </div>
  );
}
