import { pgTable, pgEnum, text, bigint, doublePrecision, boolean, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])


export const woolworths = pgTable("woolworths", {
	productName: text("product_name"),
	displayName: text("display_name"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	barcode: text("barcode"),
	imageUrl: text("image_url"),
	cupMeasure: text("cup_measure"),
	price: doublePrecision("price"),
	cupPrice: text("cup_price"),
	cupString: text("cup_string"),
	hasCupPrice: boolean("has_cup_price"),
	packageSize: text("package_size"),
	departmentName: text("department_name"),
	categoryName: text("category_name"),
	subCategoryName: text("sub_category_name"),
	segmentName: text("segment_name"),
	department: text("department"),
	aisle: text("aisle"),
	description: text("description"),
	vegetarian: text("vegetarian"),
	dietaryClaim: text("dietary_claim"),
	allergen: text("allergen"),
	allergenStatement: text("allergen_statement"),
	ingredients: text("ingredients"),
	url: text("url"),
});

export const countries = pgTable("countries", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
});

export const coles = pgTable("coles", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	name: text("name"),
	longDescription: text("long_description"),
	imageUrl: text("image_url"),
	price: text("price"),
	cupPrice: text("cup_price"),
	cupString: text("cup_string"),
	department: text("department"),
	aisle: text("aisle"),
	subCategoryName: text("sub_category_name"),
	segmentName: text("segment_name"),
	ingredients: text("ingredients"),
	allergen: text("allergen"),
	displayName: text("display_name"),
	productName: text("product_name"),
	url: text("url"),
});

export const colesRaw = pgTable("coles_raw", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
	price: text("price"),
	link: text("link"),
	data: text("data"),
});