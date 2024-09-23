import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { getWoolworthsByName } from "@/lib/api/woolworths/queries";
import pluralize from "pluralize";
import { Coles } from "@/lib/db/migrations/type";
import { getColesByName } from "@/lib/api/coles/queries";
// import OpenAI from "openai";
import { openai } from "@ai-sdk/openai";
import { OpenAIStream, StreamingTextResponse, generateObject } from "ai";
import { z } from "zod";
import { getAiModel } from "@/lib/utils";
import { CloudCog } from "lucide-react";

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

async function extractIngredients(recipe: string) {
  const { object } = await generateObject({
    model: getAiModel(),
    system:
      "You extract ingredient, keep only the important key words. Simplify the ingredient to one item.",
    schema: z.object({
      ingredients: z.array(z.string()),
    }),
    prompt: recipe,
    maxRetries: 3,
  });
  return object;
}

export async function POST(request: Request) {
  let { prompt, exclude, store } = await request.json();
  const res = await extractIngredients(prompt);
  let listIngredients =
    // JSON.parse(res.choices[0]?.message?.content || "")["ingredients"] || [];
    res.ingredients || [];
  // JSON.parse(await res.text())["ingredients"] || [];
  // Make ingredient singular like chicken thighs -> chicken thigh
  listIngredients = listIngredients.map((ingredient: string) => {
    return pluralize.singular(ingredient);
  });

  let allGroceries: { [key: string]: any } = {}; // Add index signature
  for (const ingredient of listIngredients) {
    if (store === "woolworths") {
      const groceries = await getWoolworthsByName(ingredient);
      allGroceries[ingredient] = groceries;
    } else if (store === "coles") {
      const groceries = await getColesByName(ingredient);
      allGroceries[ingredient] = groceries;
    }
  }

  // Exclude the items in allGroceries that an item in exclude is present in  Ingredients
  // TODO: fix this temporary fix
  if (!exclude) {
    exclude = "";
  }
  let excludeList: string[] = exclude.split(",");
  // remove '' and ' ' and trim words
  excludeList = excludeList.filter(
    (item: string) => item !== "" && item !== " "
  );
  excludeList = excludeList.map((item: string) => item.trim().toLowerCase());

  for (const ingredient in allGroceries) {
    allGroceries[ingredient] = allGroceries[ingredient].filter(
      (product: { ingredients: string | any[] }) => {
        for (const excludeItem of excludeList) {
          // if excludeItem in product.ingredients, then filter out the product
          if (
            typeof product.ingredients === "string" &&
            product.ingredients.toLowerCase().includes(excludeItem)
          ) {
            return false;
          }
        }
        return true;
      }
    );
  }
  // const groceryListData = allGroceries?.allGroceries;
  let groceryListData = allGroceries;
  if (!groceryListData) {
    groceryListData = []; // Return empty array if no grocery list data
  }

  const groceryData: GroceryData[] = [];

  Object.keys(groceryListData).forEach((ingredient) => {
    const departments: GroceryListData[] = [];

    groceryListData[ingredient].forEach((item: Coles) => {
      const department = item.category || ""; // Assign an empty string if department is undefined or null
      const existingDepartmentIndex = departments.findIndex(
        (dep) => dep.department === department
      );

      if (existingDepartmentIndex !== -1) {
        departments[existingDepartmentIndex].items.push(item);
      } else {
        departments.push({ department, items: [item] });
      }
    });

    const maxItemCountDepartment =
      departments.length > 0
        ? departments.reduce((prev, current) =>
            prev.items.length > current.items.length ? prev : current
          ).department
        : "";

    const maxIngredientCountDepartment =
      departments.length > 0
        ? departments.reduce((prev, current) =>
            prev.items.length > current.items.length ? prev : current
          ).department
        : "";

    groceryData.push({
      ingredient,
      departments,
      maxItemCountDepartment,
      maxIngredientCountDepartment,
      store,
    });
  });

  groceryData.forEach(({ departments }) => {
    departments.forEach(({ items }) => {
      items.sort((a, b) => {
        // Ensure nullish cupPrice does not cause errors and defaults to a logical value
        const priceA = Number(a.cupPrice) || 0;
        const priceB = Number(b.cupPrice) || 0;
        return priceA - priceB; // Assuming you want to sort ascending by cupPrice
      });
    });

    departments.sort((a, b) => {
      if (a.department === "None") {
        return 1;
      } else if (b.department === "None") {
        return -1;
      } else {
        return a.department.localeCompare(b.department);
      }
    });
  });

  return new Response(JSON.stringify(groceryData), {
    headers: { "content-type": "application/json" },
  });
}
