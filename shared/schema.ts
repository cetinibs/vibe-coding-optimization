import { z } from "zod";
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Calculations table
export const calculations = pgTable("calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  appIdea: text("app_idea").notNull(),
  results: jsonb("results").notNull(), // PlatformCalculation[]
  createdAt: timestamp("created_at").defaultNow(),
});

export type Calculation = typeof calculations.$inferSelect;
export type InsertCalculation = typeof calculations.$inferInsert;

// Favorites table
export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  calculationId: varchar("calculation_id").notNull().references(() => calculations.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

// Platform data structure
export interface Platform {
  id: string;
  name: string;
  avgPromptsPerApp: number;
  avgTokensPerPrompt: number;
  costPerMillionTokens: number; // in TRY (₺)
}

// Calculation request
export const calculationRequestSchema = z.object({
  appIdea: z.string().min(10, "Uygulama fikri en az 10 karakter olmalıdır"),
});

export type CalculationRequest = z.infer<typeof calculationRequestSchema>;

// Calculation result for a single platform
export interface PlatformCalculation {
  platform: string;
  promptCount: number;
  tokenCount: number;
  cost: number; // in TRY (₺)
}

// Full calculation response
export interface CalculationResponse {
  platforms: PlatformCalculation[];
  appIdea: string;
  calculationId?: string; // Added when user is authenticated
}

// Optimization request
export const optimizationRequestSchema = z.object({
  originalPrompt: z.string().min(10, "Prompt en az 10 karakter olmalıdır"),
});

export type OptimizationRequest = z.infer<typeof optimizationRequestSchema>;

// AI Model link
export interface AIModelLink {
  name: string;
  url: string;
  icon: string; // icon name from lucide-react or react-icons
}

// Optimization response
export interface OptimizationResponse {
  originalPrompt: string;
  optimizedPrompt: string;
  formattedPrompt: string; // markdown formatted version
  originalTokenCount: number;
  optimizedTokenCount: number;
  tokenReduction: number; // percentage
  costSavings: number; // percentage
  aiModelLinks: AIModelLink[]; // direct links to AI models
}
