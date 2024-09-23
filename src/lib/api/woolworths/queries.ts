import { db } from "@/lib/db/index";
import { woolworths } from "@/lib/db/migrations/schema";
import { eq } from "drizzle-orm";
import { ilike, like, sql } from "drizzle-orm";

export const getWoolworthsByName = async (name: string) => {
  const searchTerm = `%${name.toLowerCase()}%`;
  const rows = await db
    .select()
    .from(woolworths)
    .where(ilike(woolworths.displayName, searchTerm));
  if (rows === undefined) return {};
  const f = rows;
  // return { woolworths: f };
  return f;
};

// Search for a product by name
export const searchWoolworths = async (name: string) => {
  // If multiple words then replace whitespace with &
  const searchTerm = `%${name.toLowerCase().replace(/ /g, "&")}%`;
  const rows = await db
    .select()
    .from(woolworths)
    .where(
      sql`to_tsvector('simple', ${woolworths.displayName}) @@ to_tsquery('simple', ${searchTerm})`
    )
    .limit(5);

  if (rows === undefined) return {};
  const f = rows;
  // return { woolworths: f };
  return f;
};
