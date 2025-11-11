import { z } from "zod";

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
}

// Optimization request
export const optimizationRequestSchema = z.object({
  originalPrompt: z.string().min(10, "Prompt en az 10 karakter olmalıdır"),
});

export type OptimizationRequest = z.infer<typeof optimizationRequestSchema>;

// Optimization response
export interface OptimizationResponse {
  originalPrompt: string;
  optimizedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
  tokenReduction: number; // percentage
  costSavings: number; // percentage
}
