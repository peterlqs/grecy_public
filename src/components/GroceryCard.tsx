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
import { Coles } from "@/lib/db/migrations/type";
import { isHarmfulIngredient } from "@/lib/utils";

export default function GroceryCard({
  item,
  index,
}: {
  item: Coles;
  index: number;
}) {
  return (
    <Card className="min-w-40 max-w-40 ">
      <CardContent className="relative flex flex-col items-start p-2 h-full overflow-hidden ">
        <div className=" relative w-full">
          <a href={item.url?.toString() ?? ""} target="_blank">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
              <Button variant="outline" size="icon" className="mt-1">
                <Link />
              </Button>
            </div>
            <Image
              src={item.imageUrl?.replace("medium", "small") || ""}
              alt={item.productName?.toString() ?? ""}
              width={300}
              height={300}
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="w-full flex justify-between">
          <div>
            <p className="text-lg font-bold">${item.price}</p>
            <p className="text-xs font-light">{item.cupString}</p>
          </div>
        </div>
        {!item.ingredients ? (
          <h4 className="text-sm my-1 text-start mb-10">{item.productName}</h4>
        ) : (
          <Popover>
            <PopoverTrigger>
              <h4 className="text-sm my-1 text-start mb-10">
                {item.productName}
              </h4>
            </PopoverTrigger>
            <PopoverContent>
              {item.ingredients && (
                <div className="text-xs">
                  <strong>Ingredients:</strong>{" "}
                  {item.ingredients.split(",").map((ingredient, index) => {
                    const trimmedIngredient = ingredient.trim();
                    const isHarmful = isHarmfulIngredient(trimmedIngredient);
                    return (
                      <span
                        key={index}
                        className={`${
                          isHarmful === "high"
                            ? "text-red-600"
                            : isHarmful === "medium"
                            ? "text-yellow-600"
                            : ""
                        }`}
                      >
                        {trimmedIngredient}
                        {item.ingredients &&
                        index < item.ingredients.split(",").length - 1
                          ? ", "
                          : ""}
                      </span>
                    );
                  })}
                  <br />
                  <strong>Allergens:</strong>{" "}
                  {item.allergen?.split(",").map((allergen, index) => (
                    <span key={index}>
                      {allergen
                        .trim()
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                      {index < (item.allergen?.split(",")?.length ?? 0) - 1
                        ? ", "
                        : ""}
                    </span>
                  )) ?? null}
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          {item.nutriScore && (
            <div className="relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  item.nutriScore === "A"
                    ? "bg-green-500"
                    : item.nutriScore === "B"
                    ? "bg-green-700"
                    : item.nutriScore === "C"
                    ? "bg-yellow-500"
                    : item.nutriScore === "D"
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              >
                {item.nutriScore}
              </div>
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[8px]">
                Nutri
              </span>
            </div>
          )}
          {item.novaGroup && (
            <div className="relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  item.novaGroup === "1"
                    ? "bg-green-500"
                    : item.novaGroup === "2"
                    ? "bg-yellow-500"
                    : item.novaGroup === "3"
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              >
                {item.novaGroup}
              </div>
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[8px]">
                Nova
              </span>
            </div>
          )}
        </div>
        {!item.ingredients && (
          <div className="mt-auto bg-red-100 dark:bg-destructive p-1 rounded">
            <p className="text-xs font-light">No ingredients found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
