import { z } from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    serve: z.string(),
    time: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    ),
    steps: z.array(z.string()).describe("Don't include the step number."),
  }),
});

export type Recipe = z.infer<typeof recipeSchema>;
