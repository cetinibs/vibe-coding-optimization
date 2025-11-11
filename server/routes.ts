import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { calculationRequestSchema, optimizationRequestSchema } from "@shared/schema";
import type { CalculationResponse, OptimizationResponse } from "@shared/schema";
import { calculatePlatformCosts } from "./platforms";
import { optimizePrompt } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // POST /api/calculate - Calculate costs for all platforms
  app.post("/api/calculate", async (req, res) => {
    try {
      const validatedData = calculationRequestSchema.parse(req.body);
      
      const platforms = calculatePlatformCosts(validatedData.appIdea);
      
      const response: CalculationResponse = {
        platforms,
        appIdea: validatedData.appIdea,
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
      
      const tokenReduction = result.originalTokenCount > 0
        ? ((result.originalTokenCount - result.optimizedTokenCount) / result.originalTokenCount) * 100
        : 0;
      
      const response: OptimizationResponse = {
        originalPrompt: validatedData.originalPrompt,
        optimizedPrompt: result.optimizedPrompt,
        originalTokenCount: result.originalTokenCount,
        optimizedTokenCount: result.optimizedTokenCount,
        tokenReduction: Math.max(0, tokenReduction),
        costSavings: Math.max(0, tokenReduction), // Cost savings proportional to token reduction
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

  const httpServer = createServer(app);
  return httpServer;
}
