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

const model = openai("gpt-3.5-turbo");

async function getIdealDepartment(requestBody: string) {
  const { object } = await generateObject({
    model,
    system: "For each ingredient, find only one most suitable department.",
    schema: z.object({
      result: z.array(
        z.object({
          ingredient: z.string(),
          department: z.string(),
        })
      ),
    }),
    prompt: requestBody,
    maxRetries: 3,
  });
  return object;
}

export async function POST(request: Request) {
  const { extractDepartment } = await request.json();
  const res = await getIdealDepartment(JSON.stringify(extractDepartment));
  console.log("Response from recommendation: ");
  console.log(res);
  // console.log(res.choices[0]?.message?.content);
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
