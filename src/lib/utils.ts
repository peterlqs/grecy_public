import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { openai } from "@ai-sdk/openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export const getAiModel = () => openai("gpt-4o-mini");

export const isHarmfulIngredient = (
  ingredient: string
): "high" | "medium" | "low" => {
  // List of highly harmful ingredients
  const highHarmfulIngredients = [
    "palm oil",
    "corn syrup",
    "fructose",
    "trans fat",
    "artificial",
    "monosodium glutamate",
    "sodium nitrite",
    "potassium bromate",
    "bha",
    "bht",
    "artificial colours",
    "carrageenan",
    "partially hydrogenated oil",
    "aspartame",
    "acesulfame potassium",
    "sodium benzoate",
    "propylene glycol",
    "tartrazine",
    "sulphites",
    "hydrogenated fats",
  ];

  // List of moderately harmful ingredients
  const mediumHarmfulIngredients = [
    "sugar",
    "refined grains",
    "sodium",
    "artificial flavourings",
    "corn syrup",
    "preservative",
    "vegetable oil",
    "sunflower oil",
    "maltodextrin",
    "soy protein isolate",
    "caramel colour",
    "modified starch",
    "emulsifier",
    "stabiliser",
    "thickener",
    "natural flavour",
    "flavour enhancer",
    "flavouring",
    "anti-caking agent",
    "glucose syrup",
    "dextrose",
    "acid",
    "sweetener",
    "maltose",
    "syrup",
    "colour",
    "color",
  ];

  // Convert ingredient to lowercase for case-insensitive comparison
  const lowerIngredient = ingredient.toLowerCase();

  // Check if the ingredient is in the high harmful list
  if (
    highHarmfulIngredients.some((harmful) => lowerIngredient.includes(harmful))
  ) {
    return "high";
  }

  // Check if the ingredient is in the medium harmful list
  if (
    mediumHarmfulIngredients.some((harmful) =>
      lowerIngredient.includes(harmful)
    )
  ) {
    return "medium";
  }

  // If not found in either list, consider it low harm
  return "low";
};
