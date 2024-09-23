import { coles } from "./schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// update schema
export const insertColesSchema = createInsertSchema(coles);
export const selectColesSchema = createSelectSchema(coles);

export type Coles = z.infer<typeof insertColesSchema>;
