import OpenAI from "openai";

// Lazy initialization - only create client if API key is available
function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function optimizePrompt(originalPrompt: string): Promise<{
  optimizedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
}> {
  const openai = getOpenAIClient();
  
  // If no API key, use fallback optimization
  if (!openai) {
    return basicOptimization(originalPrompt);
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert at optimizing prompts for AI coding assistants. Your goal is to rewrite prompts to be more concise while maintaining all essential information and intent. 

Rules:
- Remove redundant phrases and filler words
- Use technical terminology appropriately
- Keep all specific requirements
- Maintain clarity and precision
- Output should be 20-40% shorter while preserving meaning

Respond with JSON in this format:
{
  "optimizedPrompt": "the optimized version",
  "reasoning": "brief explanation of changes"
}`,
        },
        {
          role: "user",
          content: `Optimize this prompt for an AI coding assistant:\n\n${originalPrompt}`,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 2048,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Estimate token counts (rough approximation: 1 token ≈ 4 characters)
    const originalTokenCount = Math.ceil(originalPrompt.length / 4);
    const optimizedTokenCount = Math.ceil(result.optimizedPrompt.length / 4);

    return {
      optimizedPrompt: result.optimizedPrompt,
      originalTokenCount,
      optimizedTokenCount,
    };
  } catch (error: any) {
    console.error("OpenAI optimization failed:", error.message);
    return basicOptimization(originalPrompt);
  }
}

// Fallback optimization when OpenAI is not available
function basicOptimization(originalPrompt: string): {
  optimizedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
} {
  // Simple fallback: remove extra whitespace and common filler words
  const optimized = originalPrompt
    .replace(/\s+/g, ' ')
    .replace(/\b(lütfen|rica ediyorum|mümkünse|eğer olabilirse|çok|gerçekten|aslında)\b/gi, '')
    .trim();
  
  const originalTokenCount = Math.ceil(originalPrompt.length / 4);
  const optimizedTokenCount = Math.ceil(optimized.length / 4);
  
  return {
    optimizedPrompt: optimized || originalPrompt,
    originalTokenCount,
    optimizedTokenCount,
  };
}
