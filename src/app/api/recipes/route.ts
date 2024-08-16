import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { getWoolworthsByName } from "@/lib/api/woolworths/queries";
import pluralize from "pluralize";
import { Woolworths } from "@/lib/db/migrations/type";
import { getColesByName } from "@/lib/api/coles/queries";
// import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { generateObject } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { Recipe, recipeSchema } from "@/lib/schema/schema";

const model = openai("gpt-3.5-turbo");

async function getRecipe(requestBody: string) {
  const { object } = await generateObject({
    model,
    system: "Generate a recipe schema based on the prompt.",
    schema: recipeSchema,
    prompt: requestBody,
    maxRetries: 3,
  });
  return object;
}

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const res = await getRecipe(JSON.stringify(prompt));
  // If number (ex: 1., 5.,...) in the step, remove it
  res.recipe.steps = res.recipe.steps.map((step) => {
    return step.replace(/^\d+\.\s/, "");
  });
  // console.log(res.choices[0]?.message?.content);
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
