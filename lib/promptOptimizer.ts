import { OptimizationResult } from "@/types";

export function optimizePrompt(prompt: string): OptimizationResult {
  const suggestions: string[] = [];
  let optimizedPrompt = prompt;

  // 1. Gereksiz boşlukları temizle
  if (/\s{2,}/.test(optimizedPrompt)) {
    optimizedPrompt = optimizedPrompt.replace(/\s{2,}/g, " ");
    suggestions.push("Gereksiz boşluklar kaldırıldı");
  }

  // 2. Başta ve sonda boşlukları temizle
  if (optimizedPrompt !== optimizedPrompt.trim()) {
    optimizedPrompt = optimizedPrompt.trim();
    suggestions.push("Başta ve sonda boşluklar temizlendi");
  }

  // 3. Tekrarlayan kelimeler
  const words = optimizedPrompt.toLowerCase().split(/\s+/);
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  const repeatedWords = Array.from(wordFreq.entries())
    .filter(([word, count]) => count > 3 && word.length > 3)
    .map(([word]) => word);

  if (repeatedWords.length > 0) {
    suggestions.push(`Tekrarlanan kelimeler tespit edildi: ${repeatedWords.slice(0, 3).join(", ")}`);
  }

  // 4. Gereksiz zarflar ve sıfatlar
  const fillerWords = [
    "çok", "gerçekten", "aslında", "kesinlikle", "muhtemelen",
    "sanırım", "belki", "oldukça", "fazlasıyla", "tamamen"
  ];

  let removedFillers = false;
  fillerWords.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, "gi");
    if (regex.test(optimizedPrompt)) {
      optimizedPrompt = optimizedPrompt.replace(regex, "");
      removedFillers = true;
    }
  });

  if (removedFillers) {
    optimizedPrompt = optimizedPrompt.replace(/\s{2,}/g, " ").trim();
    suggestions.push("Gereksiz zarflar ve dolgu kelimeler kaldırıldı");
  }

  // 5. Açık ve net talimatlar için öneriler
  if (!optimizedPrompt.includes("oluştur") &&
      !optimizedPrompt.includes("yap") &&
      !optimizedPrompt.includes("geliştir") &&
      !optimizedPrompt.includes("create") &&
      !optimizedPrompt.includes("build") &&
      !optimizedPrompt.includes("develop")) {
    suggestions.push("Net bir eylem fiili ekleyin (ör: 'oluştur', 'geliştir', 'yap')");
  }

  // 6. Teknoloji stack belirtimi
  const techTerms = ["react", "vue", "angular", "nodejs", "python", "typescript", "javascript"];
  const hasTech = techTerms.some(tech => optimizedPrompt.toLowerCase().includes(tech));

  if (!hasTech && optimizedPrompt.length > 50) {
    suggestions.push("Kullanılacak teknoloji stack'ini belirtin (ör: React, Node.js)");
  }

  // 7. Spesifik özellikler
  if (optimizedPrompt.length > 100 && !optimizedPrompt.includes(":") && !optimizedPrompt.includes("-")) {
    suggestions.push("Özellikleri madde madde listeleyin (: veya - kullanarak)");
  }

  // 8. Gereksiz nezaket ifadeleri (AI için gereksiz)
  const politenessTerms = [
    "lütfen", "please", "rica ederim", "mümkünse", "eğer olursa",
    "teşekkür ederim", "thank you", "thanks"
  ];

  let removedPoliteness = false;
  politenessTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, "gi");
    if (regex.test(optimizedPrompt)) {
      optimizedPrompt = optimizedPrompt.replace(regex, "");
      removedPoliteness = true;
    }
  });

  if (removedPoliteness) {
    optimizedPrompt = optimizedPrompt.replace(/\s{2,}/g, " ").trim();
    suggestions.push("AI için gereksiz nezaket ifadeleri kaldırıldı");
  }

  // 9. Yapısal optimizasyon önerileri
  if (optimizedPrompt.length > 200 && !optimizedPrompt.includes("\n")) {
    suggestions.push("Uzun metinleri paragraf veya listeler halinde yapılandırın");
  }

  // 10. Belirsiz ifadeler
  const vagueTerms = ["bir şeyler", "bir tür", "gibi bir", "şuna benzer"];
  vagueTerms.forEach(term => {
    if (optimizedPrompt.toLowerCase().includes(term)) {
      suggestions.push(`"${term}" yerine daha spesifik ifadeler kullanın`);
    }
  });

  // Token sayımı (yaklaşık: 4 karakter ≈ 1 token)
  const originalTokenCount = Math.ceil(prompt.length / 4);
  const optimizedTokenCount = Math.ceil(optimizedPrompt.length / 4);
  const tokensSaved = originalTokenCount - optimizedTokenCount;
  const percentageSaved = originalTokenCount > 0
    ? ((tokensSaved / originalTokenCount) * 100)
    : 0;

  // Eğer optimize edilmiş prompt çok kısa kaldıysa, orijinalini kullan
  if (optimizedPrompt.length < 10) {
    optimizedPrompt = prompt;
  }

  return {
    originalPrompt: prompt,
    optimizedPrompt,
    originalTokenCount,
    optimizedTokenCount,
    tokensSaved: Math.max(0, tokensSaved),
    percentageSaved: Math.max(0, percentageSaved),
    suggestions: suggestions.length > 0 ? suggestions : ["Prompt zaten optimize edilmiş görünüyor"],
  };
}

export function generateOptimizedPromptTemplate(appIdea: string): string {
  const complexity = estimateComplexityFromIdea(appIdea);

  let template = `${appIdea.trim()}\n\n`;

  template += "Gereksinimler:\n";
  template += "- Modern, responsive tasarım\n";
  template += "- Temiz ve sürdürülebilir kod\n";
  template += "- Hata yönetimi\n";

  if (complexity === "medium" || complexity === "complex" || complexity === "enterprise") {
    template += "- API entegrasyonu\n";
    template += "- Veritabanı yapısı\n";
  }

  if (complexity === "complex" || complexity === "enterprise") {
    template += "- Authentication sistemi\n";
    template += "- Test coverage\n";
  }

  return template;
}

function estimateComplexityFromIdea(idea: string): "simple" | "medium" | "complex" | "enterprise" {
  const lowerIdea = idea.toLowerCase();
  let score = 0;

  if (lowerIdea.includes("basit") || lowerIdea.includes("simple")) score -= 2;
  if (lowerIdea.includes("api") || lowerIdea.includes("database")) score += 2;
  if (lowerIdea.includes("auth") || lowerIdea.includes("login")) score += 2;
  if (lowerIdea.includes("mikroservis") || lowerIdea.includes("microservice")) score += 4;
  if (lowerIdea.includes("enterprise") || lowerIdea.includes("kurumsal")) score += 6;

  if (score <= 0) return "simple";
  if (score <= 4) return "medium";
  if (score <= 8) return "complex";
  return "enterprise";
}
