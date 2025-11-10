import { AIService, CostEstimate, ProjectComplexity } from "@/types";

export function calculateCost(
  service: AIService,
  complexity: ProjectComplexity
): CostEstimate {
  const inputTokens = complexity.estimatedTokens.input;
  const outputTokens = complexity.estimatedTokens.output;
  const totalTokens = inputTokens + outputTokens;

  // Maliyet hesaplama (per million tokens)
  const inputCost = (inputTokens / 1000000) * service.inputPricePerMToken;
  const outputCost = (outputTokens / 1000000) * service.outputPricePerMToken;
  const totalCost = inputCost + outputCost;

  return {
    service: service.displayName,
    inputTokens,
    outputTokens,
    totalTokens,
    inputCost,
    outputCost,
    totalCost,
    estimatedInteractions: complexity.estimatedInteractions,
  };
}

export function calculateAllServiceCosts(
  services: AIService[],
  complexity: ProjectComplexity
): CostEstimate[] {
  return services.map(service => calculateCost(service, complexity));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(2)}M`;
  } else if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return tokens.toString();
}
