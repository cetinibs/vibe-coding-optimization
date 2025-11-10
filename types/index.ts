export interface AIService {
  name: string;
  displayName: string;
  model: string;
  inputPricePerMToken: number; // Price per million tokens for input
  outputPricePerMToken: number; // Price per million tokens for output
  contextWindow: number; // Maximum context window in tokens
  description: string;
  category: "cli" | "web" | "ide";
}

export interface ProjectComplexity {
  level: "simple" | "medium" | "complex" | "enterprise";
  estimatedTokens: {
    input: number;
    output: number;
  };
  estimatedInteractions: number;
  description: string;
}

export interface CostEstimate {
  service: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  estimatedInteractions: number;
}

export interface OptimizationResult {
  originalPrompt: string;
  optimizedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
  tokensSaved: number;
  percentageSaved: number;
  suggestions: string[];
}
