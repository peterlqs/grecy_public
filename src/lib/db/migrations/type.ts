import { woolworths } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// update schema
export const insertWoolworthsSchema = createInsertSchema(woolworths);
export const selectWoolworthsSchema = createSelectSchema(woolworths);

export type Woolworths = z.infer<typeof insertWoolworthsSchema>;