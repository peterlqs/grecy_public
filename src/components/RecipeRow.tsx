import { Recipe } from "@/lib/schema/schema";
import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, UseFormReturn, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export default function RecipeRow({
  recipes,
  recipeFormState,
  toggleDialog,
}: {
  recipes: Recipe[];
  recipeFormState: UseFormReturn<FieldValues, any, undefined>;
  toggleDialog: () => void;
}) {
  if (!recipes) {
    return;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {recipes.map(({ recipe }, index) => (
        <Card key={index} className="p-4 mb-2 flex flex-col justify-between">
          <p className="text-center text-base mb-2">{recipe.name}</p>
          <div className="flex gap-2 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  View
                </Button>
              </DialogTrigger>
              {/* <DialogContent className="sm:max-w-[425px]" gap-1> */}
              <DialogContent className="md:max-w-screen-md max-w-sm max-h-screen gap-1 overflow-auto">
                <DialogHeader>
                  <DialogTitle>{recipe.name}</DialogTitle>
                  <DialogDescription>
                    Serve: {recipe.serve} - Time: {recipe.time}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <div className="gap-2">
                    <p className="font-semibold">Ingredients </p>
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <p>•</p>
                        <p>
                          {ingredient.name}: {ingredient.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">Directions </p>
                    {recipe.steps.map((step, index) => (
                      <div key={index} className="flex gap-2">
                        <p>{index + 1}.</p>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
              </DialogContent>
            </Dialog>
            <Button
              variant="default"
              size="sm"
              type="button"
              onClick={() => {
                toggleDialog();
                const ingredients = recipe.ingredients.map(
                  (ingredient) => ingredient.name
                );
                recipeFormState.setValue("prompt", ingredients.join("\n"));
              }}
            >
              Use
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
