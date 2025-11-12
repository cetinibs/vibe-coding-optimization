import {
  users,
  calculations,
  favorites,
  type User,
  type UpsertUser,
  type Calculation,
  type InsertCalculation,
  type Favorite,
  type InsertFavorite,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Calculation operations
  createCalculation(calc: InsertCalculation): Promise<Calculation>;
  getUserCalculations(userId: string): Promise<Calculation[]>;
  getCalculation(id: string): Promise<Calculation | undefined>;
  deleteCalculation(id: string): Promise<void>;
  
  // Favorite operations
  addFavorite(fav: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: string, calculationId: string): Promise<void>;
  getUserFavorites(userId: string): Promise<Calculation[]>;
  isFavorite(userId: string, calculationId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Calculation operations
  async createCalculation(calc: InsertCalculation): Promise<Calculation> {
    const [calculation] = await db.insert(calculations).values(calc).returning();
    return calculation;
  }
  
  async getUserCalculations(userId: string): Promise<Calculation[]> {
    return db
      .select()
      .from(calculations)
      .where(eq(calculations.userId, userId))
      .orderBy(desc(calculations.createdAt));
  }
  
  async getCalculation(id: string): Promise<Calculation | undefined> {
    const [calculation] = await db
      .select()
      .from(calculations)
      .where(eq(calculations.id, id));
    return calculation;
  }
  
  async deleteCalculation(id: string): Promise<void> {
    await db.delete(calculations).where(eq(calculations.id, id));
  }
  
  // Favorite operations
  async addFavorite(fav: InsertFavorite): Promise<Favorite> {
    const [favorite] = await db.insert(favorites).values(fav).returning();
    return favorite;
  }
  
  async removeFavorite(userId: string, calculationId: string): Promise<void> {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.calculationId, calculationId)));
  }
  
  async getUserFavorites(userId: string): Promise<Calculation[]> {
    const results = await db
      .select({
        calculation: calculations,
      })
      .from(favorites)
      .innerJoin(calculations, eq(favorites.calculationId, calculations.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));
    
    return results.map(r => r.calculation);
  }
  
  async isFavorite(userId: string, calculationId: string): Promise<boolean> {
    const [fav] = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.calculationId, calculationId)));
    return !!fav;
  }
}

export const storage = new DatabaseStorage();
