import { db } from "@/lib/db/index";
import { coles, woolworths } from "@/lib/db/migrations/schema";
import { eq } from "drizzle-orm";
import { ilike, like, sql } from "drizzle-orm";

export const getColesByName = async (name: string) => {
  const searchTerm = `%${name.toLowerCase()}%`;
  const rows = await db
    .select()
    .from(coles)
    .where(ilike(coles.displayName, searchTerm));
  if (rows === undefined) return {};
  const f = rows;
  // return { woolworths: f };
  return f;
};

// Search for a product by name
export const searchColes = async (name: string) => {
  console.log(name);
  // If multiple words then replace whitespace with &
  const searchTerm = `%${name.toLowerCase().replace(/ /g, "&")}%`;
  const rows = await db
    .select()
    .from(coles)
    .where(
      sql`to_tsvector('simple', ${coles.displayName}) @@ to_tsquery('simple', ${searchTerm})`
    )
    .limit(5);

  if (rows === undefined) return {};
  const f = rows;
  // return { woolworths: f };
  return f;
};
