import {
  pgTable,
  pgEnum,
  text,
  bigint,
  doublePrecision,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const keyStatus = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const keyType = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const equalityOp = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);

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
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name"),
});

export const coles = pgTable("coles", {
  // General
  id: text("id").primaryKey().notNull(),
  productName: text("product_name"),
  displayName: text("display_name"),
  description: text("description"),
  longDescription: text("long_description"),
  imageUrl: text("image_url"),
  url: text("url"),
  size: text("size"),
  // Price
  price: doublePrecision("price"),
  cupString: text("cup_string"),
  cupPrice: doublePrecision("cup_price"),
  brand: text("brand"),
  // Category
  categoryGroup: text("category_group"),
  category: text("category"),
  subCategory: text("sub_category"),
  // Ingredients
  ingredients: text("ingredients"),
  allergen: text("allergen"),
  // Nutrition for 100g (or 100ml)
  protein: doublePrecision("protein"),
  totalFat: doublePrecision("total_fat"),
  saturatedFat: doublePrecision("saturated_fat"),
  carbohydrate: doublePrecision("carbohydrate"),
  sugars: doublePrecision("sugars"),
  sodium: doublePrecision("sodium"),
  energy: doublePrecision("energy"),
  vitaminC: doublePrecision("vitamin_c"),
  bicarbonate: doublePrecision("bicarbonate"),
  calcium: doublePrecision("calcium"),
  dietaryFibre: doublePrecision("dietary_fibre"),
  gluten: doublePrecision("gluten"),
  monounsaturated: doublePrecision("monounsaturated"),
  trans: doublePrecision("trans"),
  glycine: doublePrecision("glycine"),
  tryptophan: doublePrecision("tryptophan"),
  methionine: doublePrecision("methionine"),
  eicosapentaenoicAcid: doublePrecision("eicosapentaenoic_acid"),
  lycopene: doublePrecision("lycopene"),
  vitaminB6: doublePrecision("vitamin_b6"),
  folate: doublePrecision("folate"),
  niacin: doublePrecision("niacin"),
  vitaminD: doublePrecision("vitamin_d"),
  asparticAcid: doublePrecision("aspartic_acid"),
  cysteine: doublePrecision("cysteine"),
  inositol: doublePrecision("inositol"),
  sucrose: doublePrecision("sucrose"),
  lactose: doublePrecision("lactose"),
  vitaminK: doublePrecision("vitamin_k"),
  maltose: doublePrecision("maltose"),
  selenium: doublePrecision("selenium"),
  tyrosine: doublePrecision("tyrosine"),
  inulin: doublePrecision("inulin"),
  vitaminB5: doublePrecision("vitamin_b5"),
  lysine: doublePrecision("lysine"),
  maltitol: doublePrecision("maltitol"),
  vitaminB: doublePrecision("vitamin_b"),
  iron: doublePrecision("iron"),
  galactose: doublePrecision("galactose"),
  valine: doublePrecision("valine"),
  energyKj: doublePrecision("energy_kj"),
  vitaminB2: doublePrecision("vitamin_b2"),
  paba: doublePrecision("paba"),
  erythritol: doublePrecision("erythritol"),
  potassium: doublePrecision("potassium"),
  threonine: doublePrecision("threonine"),
  omega6: doublePrecision("omega_6"),
  arginine: doublePrecision("arginine"),
  molybdenum: doublePrecision("molybdenum"),
  alcohol: doublePrecision("alcohol"),
  coenzymeQ10: doublePrecision("coenzyme_q10"),
  vitaminE: doublePrecision("vitamin_e"),
  cholesterol: doublePrecision("cholesterol"),
  omega3: doublePrecision("omega_3"),
  phenylalanine: doublePrecision("phenylalanine"),
  polydextrose: doublePrecision("polydextrose"),
  bioflavoids: doublePrecision("bioflavoids"),
  dha: doublePrecision("dha"),
  chromium: doublePrecision("chromium"),
  manganese: doublePrecision("manganese"),
  phytosterols: doublePrecision("phytosterols"),
  glycerol: doublePrecision("glycerol"),
  zinc: doublePrecision("zinc"),
  leucine: doublePrecision("leucine"),
  proline: doublePrecision("proline"),
  isoleucine: doublePrecision("isoleucine"),
  glucose: doublePrecision("glucose"),
  phosphorus: doublePrecision("phosphorus"),
  magnesium: doublePrecision("magnesium"),
  vitaminA: doublePrecision("vitamin_a"),
  folicAcid: doublePrecision("folic_acid"),
  glucuronolactone: doublePrecision("glucuronolactone"),
  alphaLinolenicAcid: doublePrecision("alpha_linolenic_acid"),
  sorbitol: doublePrecision("sorbitol"),
  alanine: doublePrecision("alanine"),
  thiamin: doublePrecision("thiamin"),
  epa: doublePrecision("epa"),
  biotin: doublePrecision("biotin"),
  taurine: doublePrecision("taurine"),
  chloride: doublePrecision("chloride"),
  riboflavin: doublePrecision("riboflavin"),
  carnitine: doublePrecision("carnitine"),
  caffeine: doublePrecision("caffeine"),
  iodine: doublePrecision("iodine"),
  choline: doublePrecision("choline"),
  histidine: doublePrecision("histidine"),
  copper: doublePrecision("copper"),
  fructose: doublePrecision("fructose"),
  serine: doublePrecision("serine"),
  solubleFibre: doublePrecision("soluble_fibre"),
  betaGlucan: doublePrecision("beta_glucan"),
  organicAcids: doublePrecision("organic_acids"),
  vitaminB12: doublePrecision("vitamin_b12"),

  // Nutrition for 1 serving
  energyServing: doublePrecision("energy_serving"),
  proteinServing: doublePrecision("protein_serving"),
  fatTotalServing: doublePrecision("fat_total_serving"),
  saturatedFatServing: doublePrecision("saturated_fat_serving"),
  carbohydrateServing: doublePrecision("carbohydrate_serving"),
  sugarsServing: doublePrecision("sugars_serving"),
  dietaryFibreServing: doublePrecision("dietary_fibre_serving"),
  sodiumServing: doublePrecision("sodium_serving"),
  potassiumServing: doublePrecision("potassium_serving"),
  calciumServing: doublePrecision("calcium_serving"),
  ironServing: doublePrecision("iron_serving"),
  vitaminCServing: doublePrecision("vitamin_c_serving"),
  vitaminB3Serving: doublePrecision("vitamin_b3_serving"),
  vitaminB6Serving: doublePrecision("vitamin_b6_serving"),
  vitaminB1Serving: doublePrecision("vitamin_b1_serving"),
  vitaminB2Serving: doublePrecision("vitamin_b2_serving"),
  vitaminB5Serving: doublePrecision("vitamin_b5_serving"),
  vitaminEServing: doublePrecision("vitamin_e_serving"),
  folateServing: doublePrecision("folate_serving"),
  vitaminB12Serving: doublePrecision("vitamin_b12_serving"),
  vitaminDServing: doublePrecision("vitamin_d_serving"),
  vitaminAServing: doublePrecision("vitamin_a_serving"),
  luteinServing: doublePrecision("lutein_serving"),
  glycemicIndexServing: doublePrecision("glycemic_index_serving"),
  lactoseServing: doublePrecision("lactose_serving"),
  polyunsaturatedFatServing: doublePrecision("polyunsaturated_fat_serving"),
  monounsaturatedFatServing: doublePrecision("monounsaturated_fat_serving"),
  transFatServing: doublePrecision("trans_fat_serving"),
  glutenServing: doublePrecision("gluten_serving"),
  caffeineServing: doublePrecision("caffeine_serving"),
  tryptophanServing: doublePrecision("tryptophan_serving"),
  threonineServing: doublePrecision("threonine_serving"),
  omega6Serving: doublePrecision("omega_6_serving"),
  arginineServing: doublePrecision("arginine_serving"),
  molybdenumServing: doublePrecision("molybdenum_serving"),
  alcoholServing: doublePrecision("alcohol_serving"),
  coenzymeQ10Serving: doublePrecision("coenzyme_q10_serving"),
  cholesterolServing: doublePrecision("cholesterol_serving"),
  omega3Serving: doublePrecision("omega_3_serving"),
  phenylalanineServing: doublePrecision("phenylalanine_serving"),
  polydextroseServing: doublePrecision("polydextrose_serving"),
  bioflavoidsServing: doublePrecision("bioflavoids_serving"),
  dhaServing: doublePrecision("dha_serving"),
  chromiumServing: doublePrecision("chromium_serving"),
  manganeseServing: doublePrecision("manganese_serving"),
  phytosterolsServing: doublePrecision("phytosterols_serving"),
  glycerolServing: doublePrecision("glycerol_serving"),
  zincServing: doublePrecision("zinc_serving"),
  leucineServing: doublePrecision("leucine_serving"),
  prolineServing: doublePrecision("proline_serving"),
  isoleucineServing: doublePrecision("isoleucine_serving"),
  glucoseServing: doublePrecision("glucose_serving"),
  phosphorusServing: doublePrecision("phosphorus_serving"),
  magnesiumServing: doublePrecision("magnesium_serving"),
  folicAcidServing: doublePrecision("folic_acid_serving"),
  glucuronolactoneServing: doublePrecision("glucuronolactone_serving"),
  alphaLinolenicAcidServing: doublePrecision("alpha_linolenic_acid_serving"),
  sorbitolServing: doublePrecision("sorbitol_serving"),
  alanineServing: doublePrecision("alanine_serving"),
  thiaminServing: doublePrecision("thiamin_serving"),
  epaServing: doublePrecision("epa_serving"),
  biotinServing: doublePrecision("biotin_serving"),
  taurineServing: doublePrecision("taurine_serving"),
  chlorideServing: doublePrecision("chloride_serving"),
  riboflavinServing: doublePrecision("riboflavin_serving"),
  carnitineServing: doublePrecision("carnitine_serving"),
  iodineServing: doublePrecision("iodine_serving"),
  cholineServing: doublePrecision("choline_serving"),
  histidineServing: doublePrecision("histidine_serving"),
  copperServing: doublePrecision("copper_serving"),
  fructoseServing: doublePrecision("fructose_serving"),
  serineServing: doublePrecision("serine_serving"),
  solubleFibreServing: doublePrecision("soluble_fibre_serving"),
  betaGlucanServing: doublePrecision("beta_glucan_serving"),
  organicAcidsServing: doublePrecision("organic_acids_serving"),
  // Eco info
  originCountry: text("origin_country"),
  originPercent: doublePrecision("origin_percent"),
  nutriScore: text("nutri_score"),
  novaGroup: text("nova_group"),
});

export const colesRaw = pgTable("coles_raw", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text("name"),
  price: text("price"),
  link: text("link"),
  data: text("data"),
});
