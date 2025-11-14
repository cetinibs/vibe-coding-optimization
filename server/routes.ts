import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { calculationRequestSchema, optimizationRequestSchema } from "@shared/schema";
import type { CalculationResponse, OptimizationResponse } from "@shared/schema";
import { calculatePlatformCosts } from "./platforms";
import { optimizePrompt } from "./openai";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  await setupAuth(app);
  
  // GET /api/auth/user - Get current authenticated user
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // POST /api/calculate - Calculate costs for all platforms (now saves to DB if authenticated)
  app.post("/api/calculate", async (req, res) => {
    try {
      const validatedData = calculationRequestSchema.parse(req.body);
      
      const platforms = calculatePlatformCosts(validatedData.appIdea);
      
      // Save to database if user is authenticated
      let calculationId: string | undefined;
      if (req.isAuthenticated()) {
        const user = req.user as any;
        const userId = user.claims.sub;
        const calculation = await storage.createCalculation({
          userId,
          appIdea: validatedData.appIdea,
          results: platforms,
        });
        calculationId = calculation.id;
      }
      
      const response: CalculationResponse = {
        platforms,
        appIdea: validatedData.appIdea,
        calculationId,
      };
      
      res.json(response);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }
      
      console.error("Calculation error:", error);
      res.status(500).json({ 
        error: "Hesaplama sırasında bir hata oluştu" 
      });
    }
  });

  // POST /api/optimize - Optimize a prompt using AI
  app.post("/api/optimize", async (req, res) => {
    try {
      const validatedData = optimizationRequestSchema.parse(req.body);
      
      const result = await optimizePrompt(validatedData.originalPrompt);
      
      // Calculate token reduction percentages
      const tokenReduction = result.originalTokenCount > 0
        ? ((result.originalTokenCount - result.optimizedTokenCount) / result.originalTokenCount) * 100
        : 0;
      
      const toonTokenReduction = result.optimizedTokenCount > 0
        ? ((result.optimizedTokenCount - result.toonTokenCount) / result.optimizedTokenCount) * 100
        : 0;
      
      const response: OptimizationResponse = {
        originalPrompt: validatedData.originalPrompt,
        optimizedPrompt: result.optimizedPrompt,
        formattedPrompt: result.formattedPrompt,
        toonFormat: result.toonFormat,
        aiModelLinks: result.aiModelLinks,
        originalTokenCount: result.originalTokenCount,
        optimizedTokenCount: result.optimizedTokenCount,
        toonTokenCount: result.toonTokenCount,
        tokenReduction: Math.max(0, tokenReduction),
        toonTokenReduction: Math.max(0, toonTokenReduction),
        costSavings: Math.max(0, tokenReduction),
        toonCostSavings: Math.max(0, toonTokenReduction),
      };
      
      res.json(response);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }
      
      console.error("Optimization error:", error);
      res.status(500).json({ 
        error: "Optimizasyon sırasında bir hata oluştu. OpenAI API anahtarınızı kontrol edin." 
      });
    }
  });
  
  // GET /api/calculations - Get user's calculation history
  app.get("/api/calculations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const calculations = await storage.getUserCalculations(userId);
      res.json(calculations);
    } catch (error) {
      console.error("Error fetching calculations:", error);
      res.status(500).json({ message: "Hesaplamalar yüklenirken hata oluştu" });
    }
  });
  
  // GET /api/calculations/:id - Get single calculation
  app.get("/api/calculations/:id", isAuthenticated, async (req: any, res) => {
    try {
      const calculation = await storage.getCalculation(req.params.id);
      if (!calculation) {
        return res.status(404).json({ message: "Hesaplama bulunamadı" });
      }
      
      // Check if user owns this calculation
      const userId = req.user.claims.sub;
      if (calculation.userId !== userId) {
        return res.status(403).json({ message: "Bu hesaplamaya erişim yetkiniz yok" });
      }
      
      res.json(calculation);
    } catch (error) {
      console.error("Error fetching calculation:", error);
      res.status(500).json({ message: "Hesaplama yüklenirken hata oluştu" });
    }
  });
  
  // DELETE /api/calculations/:id - Delete calculation
  app.delete("/api/calculations/:id", isAuthenticated, async (req: any, res) => {
    try {
      const calculation = await storage.getCalculation(req.params.id);
      if (!calculation) {
        return res.status(404).json({ message: "Hesaplama bulunamadı" });
      }
      
      // Check if user owns this calculation
      const userId = req.user.claims.sub;
      if (calculation.userId !== userId) {
        return res.status(403).json({ message: "Bu hesaplamayı silemezsiniz" });
      }
      
      await storage.deleteCalculation(req.params.id);
      res.json({ message: "Hesaplama silindi" });
    } catch (error) {
      console.error("Error deleting calculation:", error);
      res.status(500).json({ message: "Hesaplama silinirken hata oluştu" });
    }
  });
  
  // POST /api/favorites - Add to favorites
  app.post("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const { calculationId } = req.body;
      if (!calculationId) {
        return res.status(400).json({ message: "calculationId gerekli" });
      }
      
      const userId = req.user.claims.sub;
      
      // Check if calculation exists and belongs to user
      const calculation = await storage.getCalculation(calculationId);
      if (!calculation || calculation.userId !== userId) {
        return res.status(404).json({ message: "Hesaplama bulunamadı" });
      }
      
      // Check if already favorited
      const isFav = await storage.isFavorite(userId, calculationId);
      if (isFav) {
        return res.status(400).json({ message: "Zaten favorilerde" });
      }
      
      const favorite = await storage.addFavorite({ userId, calculationId });
      res.json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Favorilere eklenirken hata oluştu" });
    }
  });
  
  // DELETE /api/favorites/:calculationId - Remove from favorites
  app.delete("/api/favorites/:calculationId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { calculationId } = req.params;
      
      await storage.removeFavorite(userId, calculationId);
      res.json({ message: "Favorilerden çıkarıldı" });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Favorilerden çıkarılırken hata oluştu" });
    }
  });
  
  // GET /api/favorites - Get user's favorites
  app.get("/api/favorites", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Favoriler yüklenirken hata oluştu" });
    }
  });
  
  // GET /api/favorites/check/:calculationId - Check if calculation is favorited
  app.get("/api/favorites/check/:calculationId", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { calculationId } = req.params;
      
      const isFav = await storage.isFavorite(userId, calculationId);
      res.json({ isFavorite: isFav });
    } catch (error) {
      console.error("Error checking favorite:", error);
      res.status(500).json({ message: "Favori durumu kontrol edilirken hata oluştu" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
