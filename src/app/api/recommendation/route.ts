import { generateObject } from "ai";
import { z } from "zod";
import { getAiModel } from "@/lib/utils";

async function getIdealDepartment(requestBody: string) {
  const { object } = await generateObject({
    model: getAiModel(),
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
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
