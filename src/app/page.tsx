"use client";

import GroceryList from "@/components/GroceryList";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  SearchIcon,
  X,
} from "lucide-react";
import { use, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Recipe } from "@/lib/schema/schema";
import { set, z } from "zod";
import RecipeRow from "@/components/RecipeRow";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { excludeExample, recipeExample } from "@/config/recipeExample";
import Image from "next/image";
import { RecipeDialog } from "@/components/RecipeDialog";
import { Coles } from "@/lib/db/migrations/type";

type Inputs = {
  prompt: string;
  exclude: string;
  store: string;
};

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

export default function LandingPage() {
  // useState
  const [groceryData, setGroceryData] = useState<GroceryData[]>();
  const [store, setStore] = useState("coles");
  const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const toggleExpanded2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  // TEST
  const forms = {
    ingredients: useForm(),
  };

  const onSubmitIngredient = async (data: any) => {
    try {
      data.store = store;
      data.exclude = excludeIngredients.join(", ");
      const response = await fetch("/api/groceries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const responseData = await response.json();
      setGroceryData(responseData);
      // Scroll to groceryData id with offset after wait 200ms
      setTimeout(() => {
        const element = document.getElementById("groceryData");
        const offset = element!.offsetTop - 50; // Adjust 100px for header or desired offset
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }, 200);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addExcludeIngredients = () => {
    const exclude = forms.ingredients.getValues("exclude");
    if (exclude) {
      if (!excludeIngredients.includes(exclude)) {
        setExcludeIngredients((prevExclude) => [...prevExclude, exclude]);
      }
      forms.ingredients.setValue("exclude", "");
    }
  };

  return (
    <div className="flex flex-col">
      <main>
        <div className="px-8">
          <div className="px-4 lg:px-6 pt-16 pb-8 text-center">
            <h1 className="text-4xl font-bold mb-1.5 text-primary">
              Recipe to Groceries.
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {/* <p className="text-lg"> */}
              Turn any recipe into a local grocery list in seconds.
            </p>
          </div>

          <Card className="max-w-3xl p-4 mx-auto bg-muted">
            <div className="flex items-baseline">
              <Label className="text-lg">Put your recipe here</Label>
              <RecipeDialog ingredientsForm={forms.ingredients} />
            </div>
            <form onSubmit={forms.ingredients.handleSubmit(onSubmitIngredient)}>
              {/* Ingredient form */}
              <div className="flex flex-col gap-4 mx-auto">
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 mb-2"></div>
                  <Textarea
                    {...forms.ingredients.register("prompt", {
                      required: true,
                    })}
                    placeholder={`Any recipe format works, for example:\n${recipeExample[0][
                      "ingredients"
                    ].slice(0, 121)}...`}
                    rows={8}
                    maxLength={700}
                  />
                  {forms.ingredients.formState.errors.prompt && (
                    <p className="text-sm text-destructive mt-1">
                      This field is required
                    </p>
                  )}
                  <div className="flex flex-wrap mt-2 gap-1">
                    {recipeExample.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="xs"
                        type="button"
                        onClick={() => {
                          forms.ingredients.setValue(
                            "prompt",
                            example.ingredients
                          );
                        }}
                      >
                        {example.name}
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    ))}
                  </div>
                </div>
                {/* Exclude ingredients */}
                <Collapsible>
                  <div className="flex flex-col gap-2">
                    <CollapsibleTrigger
                      onClick={toggleExpanded2}
                      className="flex gap-2 items-center"
                    >
                      <p className="text-lg font-medium text-start flex gap-2 items-center hover:text-primary">
                        Filter
                        {isExpanded2 ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </p>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className=" mb-1">Exclude ingredients</p>
                      <div className="flex gap-2">
                        <Input
                          {...forms.ingredients.register("exclude", {
                            required: false,
                          })}
                          maxLength={30}
                          placeholder={`Example: corn syrup`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addExcludeIngredients();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={
                            // add the exclude ingredients to the list
                            addExcludeIngredients
                          }
                        >
                          Add
                        </Button>
                      </div>
                      {/* render the exclude ingredients with Button xs */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {excludeIngredients.map((exclude, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="xs"
                            type="button"
                            onClick={() => {
                              setExcludeIngredients(
                                excludeIngredients.filter(
                                  (item) => item !== exclude
                                )
                              );
                            }}
                          >
                            {exclude}
                            <X className="h-4 w-4 text-destructive ml-1" />
                          </Button>
                        ))}
                      </div>
                      <div className="flex flex-wrap mt-2 gap-1">
                        {excludeExample.map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="xs"
                            type="button"
                            onClick={() => {
                              // add in the exclude ingredients, include the ones before
                              setExcludeIngredients((prevExclude) => {
                                const uniqueIngredients = new Set([
                                  ...prevExclude,
                                  ...example.ingredients.split(", "),
                                ]);
                                return Array.from(uniqueIngredients);
                              });
                            }}
                          >
                            {example.name}
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
                <div className="flex flex-row gap-2">
                  <p className="self-center">Store: </p>
                  <ToggleGroup
                    type="single"
                    defaultValue="woolworths"
                    value={store}
                    onValueChange={(store) => {
                      if (store) setStore(store);
                    }}
                  >
                    <ToggleGroupItem
                      value="coles"
                      aria-label="Toggle coles"
                      variant={"outline"}
                    >
                      <Image
                        src="/coles.png"
                        alt="Coles"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Coles
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="woolworths"
                      aria-label="Toggle woolworths"
                      variant={"outline"}
                    >
                      <Image
                        src="/woolworths.png"
                        alt="Coles"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Woolworths
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <Button
                  type="submit"
                  disabled={forms.ingredients.formState.isSubmitting}
                  variant="expandIcon"
                  Icon={SearchIcon}
                  iconPlacement="right"
                >
                  {forms.ingredients.formState.isSubmitting
                    ? "Loading..."
                    : "Find"}
                </Button>
              </div>
            </form>
            {/* Recipe form */}
          </Card>
          {/* Image tutorial */}
          {!groceryData && (
            <div>
              {/* full width Image */}
              <Image
                src="/tutorial.png"
                alt="Tutorial"
                width={1000}
                height={500}
                className="mx-auto my-6 rounded-xl hidden sm:block"
              />
            </div>
          )}
        </div>
        <div id="groceryData" className="px-4 md:px-8">
          <GroceryList groceryData={groceryData || ([] as GroceryData[])} />
        </div>
      </main>
    </div>
  );
}
