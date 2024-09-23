import { Coles } from "@/lib/db/migrations/type";
import { CircleHelpIcon, Link } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import GroceryCard from "./GroceryCard";
import LoadingRecommendation from "./LoadingRecommendation";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface GroceryListData {
  department: string;
  items: Coles[];
}

interface GroceryData {
  ingredient: string;
  departments: GroceryListData[];
  maxItemCountDepartment: string;
  maxIngredientCountDepartment: string;
}

interface IngredientDepartment {
  ingredient: string;
  department: string[];
}

export default function GroceryRecommendation({
  groceryData,
  notFoundIngredients,
}: {
  groceryData: GroceryData[];
  notFoundIngredients: GroceryData[];
}) {
  const extractDepartment: IngredientDepartment[] = groceryData.map(
    ({ ingredient, departments }) => {
      return {
        ingredient,
        department: departments.map(({ department }) => department),
      };
    }
  );

  const { isPending, error, data } = useQuery({
    queryKey: ["recommendation", extractDepartment], // refresh when extractDepartment changes
    queryFn: () =>
      fetch("/api/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractDepartment }),
      }).then((res) => {
        // wait 10 secs
        return new Promise((resolve) => setTimeout(resolve, 1)).then(() =>
          res.json()
        );
      }),
  });

  if (isPending) return <LoadingRecommendation />;
  if (error) return "An error has occurred: " + error.message;

  // Include only the department that is most suited
  const filteredGroceryData = groceryData.map(({ ingredient, departments }) => {
    const newDepartments = departments.filter(({ department }) =>
      data["result"].some(
        (item: { ingredient: string; department: string }) =>
          item.ingredient === ingredient && item.department === department
      )
    );
    return { ingredient, departments: newDepartments };
  });

  // Filtered out items with no ingredients
  filteredGroceryData.forEach((departmentData) => {
    departmentData.departments.forEach((department) => {
      const { items } = department;
      // Check if all items have ingredients
      const allItemsLackIngredients = items.every((item) => !item.ingredients);

      // If not all items lack ingredients, filter out items that lack ingredients
      if (!allItemsLackIngredients) {
        const filteredItems = items.filter((item) => item.ingredients);
        // Directly mutate the department's items
        department.items = filteredItems;
      }
    });
  });

  return (
    <div>
      {Object.keys(filteredGroceryData).length > 0 && (
        <div id="groceryRecommendation">
          <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">
            Recommended Groceries
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelpIcon className="h-4 w-4 text-muted-foreground ml-2" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-sm font-normal align-baseline">
                    Items are sorted by unit price.
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>

          <ScrollArea>
            <div className="flex flex-nowrap overflow-x-auto gap-2">
              {filteredGroceryData.map(({ departments }, ingredientIndex) => {
                if (departments.length > 0 && departments[0].items.length > 0) {
                  return (
                    <GroceryCard
                      index={Number(departments[0].items[0].id)} // Convert to number
                      item={departments[0].items[0]}
                      key={ingredientIndex}
                    />
                  );
                }
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {notFoundIngredients.length > 0 && (
            <p className="mt-2">
              <span className="font-semibold">Not found: </span>
              {notFoundIngredients
                .map(({ ingredient }) => ingredient)
                .join(", ")}
              <br />
              Try simplifying the ingredients.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
