import { ProjectComplexity } from "@/types";

export function estimateProjectComplexity(description: string): ProjectComplexity {
  const lowerDesc = description.toLowerCase();

  // Keywords için scoring
  let score = 0;

  // Basit keywords
  const simpleKeywords = ["basit", "simple", "küçük", "small", "hızlı", "todo", "landing page"];
  simpleKeywords.forEach(keyword => {
    if (lowerDesc.includes(keyword)) score -= 2;
  });

  // Orta seviye keywords
  const mediumKeywords = ["crud", "api", "database", "auth", "login", "form", "dashboard"];
  mediumKeywords.forEach(keyword => {
    if (lowerDesc.includes(keyword)) score += 2;
  });

  // Kompleks keywords
  const complexKeywords = ["mikroservis", "microservice", "real-time", "gerçek zamanlı", "machine learning", "ai", "yapay zeka"];
  complexKeywords.forEach(keyword => {
    if (lowerDesc.includes(keyword)) score += 4;
  });

  // Enterprise keywords
  const enterpriseKeywords = ["enterprise", "kurumsal", "ölçeklenebilir", "scalable", "distributed", "dağıtık"];
  enterpriseKeywords.forEach(keyword => {
    if (lowerDesc.includes(keyword)) score += 6;
  });

  // Kelime sayısı (daha detaylı açıklama = daha kompleks)
  const wordCount = description.split(/\s+/).length;
  if (wordCount > 100) score += 4;
  else if (wordCount > 50) score += 2;
  else if (wordCount > 20) score += 1;

  // Teknoloji stack sayısı
  const techKeywords = ["react", "vue", "angular", "nodejs", "python", "django", "flask", "postgresql", "mongodb", "redis", "docker", "kubernetes"];
  const techCount = techKeywords.filter(tech => lowerDesc.includes(tech)).length;
  score += techCount;

  // Score'a göre kompleksiteyi belirle
  if (score <= 0) {
    return {
      level: "simple",
      estimatedTokens: {
        input: 50000,
        output: 30000,
      },
      estimatedInteractions: 10,
      description: "Basit, tek sayfalık veya küçük özellikli uygulama",
    };
  } else if (score <= 5) {
    return {
      level: "medium",
      estimatedTokens: {
        input: 150000,
        output: 100000,
      },
      estimatedInteractions: 25,
      description: "Orta karmaşıklıkta, birden fazla özellik ve sayfa içeren uygulama",
    };
  } else if (score <= 10) {
    return {
      level: "complex",
      estimatedTokens: {
        input: 400000,
        output: 250000,
      },
      estimatedInteractions: 50,
      description: "Karmaşık, çok katmanlı mimari ve gelişmiş özellikler içeren uygulama",
    };
  } else {
    return {
      level: "enterprise",
      estimatedTokens: {
        input: 1000000,
        output: 600000,
      },
      estimatedInteractions: 100,
      description: "Kurumsal seviye, mikroservis mimarisi ve yüksek ölçeklenebilirlik gerektiren uygulama",
    };
  }
}

export function estimateTokensFromDescription(description: string): { input: number; output: number } {
  // Basit bir tahmin: her 4 karakter ≈ 1 token
  const baseTokens = Math.ceil(description.length / 4);

  // Uygulama geliştirme için yaklaşık token çarpanları
  const complexity = estimateProjectComplexity(description);

  return {
    input: complexity.estimatedTokens.input,
    output: complexity.estimatedTokens.output,
  };
}
