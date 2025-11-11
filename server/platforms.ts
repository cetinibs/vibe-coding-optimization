import type { Platform, PlatformCalculation } from "@shared/schema";

// Platform data with realistic estimates based on typical usage patterns
export const platforms: Platform[] = [
  {
    id: "codex-cli",
    name: "Codex CLI",
    avgPromptsPerApp: 15,
    avgTokensPerPrompt: 800,
    costPerMillionTokens: 60, // ₺60 per 1M tokens
  },
  {
    id: "claude-code",
    name: "Claude Code",
    avgPromptsPerApp: 12,
    avgTokensPerPrompt: 750,
    costPerMillionTokens: 45,
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    avgPromptsPerApp: 14,
    avgTokensPerPrompt: 700,
    costPerMillionTokens: 35,
  },
  {
    id: "cursor",
    name: "Cursor",
    avgPromptsPerApp: 18,
    avgTokensPerPrompt: 900,
    costPerMillionTokens: 55,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    avgPromptsPerApp: 16,
    avgTokensPerPrompt: 850,
    costPerMillionTokens: 50,
  },
  {
    id: "trea",
    name: "Trea",
    avgPromptsPerApp: 13,
    avgTokensPerPrompt: 720,
    costPerMillionTokens: 40,
  },
  {
    id: "replit",
    name: "Replit",
    avgPromptsPerApp: 10,
    avgTokensPerPrompt: 650,
    costPerMillionTokens: 38,
  },
  {
    id: "v0",
    name: "v0",
    avgPromptsPerApp: 8,
    avgTokensPerPrompt: 600,
    costPerMillionTokens: 42,
  },
  {
    id: "bolt",
    name: "Bolt",
    avgPromptsPerApp: 14,
    avgTokensPerPrompt: 780,
    costPerMillionTokens: 48,
  },
];

export function calculatePlatformCosts(appIdea: string): PlatformCalculation[] {
  // Calculate complexity factor based on app idea length and keywords
  const complexityKeywords = [
    'database', 'veritabanı', 'authentication', 'kimlik doğrulama', 'api', 
    'payment', 'ödeme', 'real-time', 'gerçek zamanlı', 'analytics', 'analitik',
    'dashboard', 'admin', 'yönetim', 'notification', 'bildirim', 'chat', 'sohbet',
    'e-commerce', 'e-ticaret', 'social', 'sosyal', 'machine learning', 'ai'
  ];
  
  const lowerIdea = appIdea.toLowerCase();
  const keywordCount = complexityKeywords.filter(kw => lowerIdea.includes(kw)).length;
  
  // Complexity multiplier: 0.7 (simple) to 1.5 (very complex)
  const lengthFactor = Math.min(appIdea.length / 500, 1.2);
  const keywordFactor = Math.min(keywordCount * 0.1, 0.3);
  const complexityMultiplier = 0.7 + lengthFactor + keywordFactor;

  return platforms.map(platform => {
    const adjustedPrompts = Math.round(platform.avgPromptsPerApp * complexityMultiplier);
    const adjustedTokensPerPrompt = Math.round(platform.avgTokensPerPrompt * complexityMultiplier);
    const totalTokens = adjustedPrompts * adjustedTokensPerPrompt;
    const cost = (totalTokens / 1000000) * platform.costPerMillionTokens;

    return {
      platform: platform.name,
      promptCount: adjustedPrompts,
      tokenCount: totalTokens,
      cost: cost,
    };
  });
}
