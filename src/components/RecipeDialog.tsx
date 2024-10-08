import { ChevronDown, ChevronRight, Copy, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RecipeRow from "./RecipeRow";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import { useState } from "react";
import { Recipe } from "@/lib/schema/schema";

export function RecipeDialog({
  ingredientsForm,
}: {
  ingredientsForm: UseFormReturn<FieldValues, any, undefined>;
}) {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);

  const forms = {
    recipes: useForm(),
  };

  const onSubmitRecipe = async (data: any) => {
    try {
      const response = await fetch("/api/recipes", {
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
      // add the recipe to the recipes
      setRecipes((prevRecipes) => [...(prevRecipes || []), responseData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="link" size="sm" className="px-2">
          or find one first
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-xs max-h-screen gap-1 overflow-auto">
        <DialogHeader>
          <DialogTitle>Find a recipe</DialogTitle>
          {/* <DialogDescription>The recipe is generated by GPT.</DialogDescription> */}
        </DialogHeader>
        <form
          onSubmit={forms.recipes.handleSubmit(onSubmitRecipe)}
          className=""
        >
          <div className="flex flex-col gap-4 mx-auto ">
            <div>
              <div className="flex flex-row gap-2">
                <Input
                  {...forms.recipes.register("prompt", {
                    required: true,
                  })}
                  placeholder="e.g. Teriyaki Chicken"
                />
                <Button
                  disabled={forms.recipes.formState.isSubmitting}
                  variant="expandIcon"
                  Icon={SearchIcon}
                  iconPlacement="right"
                >
                  {forms.recipes.formState.isSubmitting ? "Loading..." : "Find"}
                </Button>
              </div>
              {forms.recipes.formState.errors.prompt && (
                <p className="text-sm text-destructive mt-1">
                  This field is required
                </p>
              )}
              <ScrollArea className="mx-auto mt-2">
                <RecipeRow
                  recipes={recipes ?? []}
                  recipeFormState={ingredientsForm}
                  toggleDialog={toggleDialog}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
