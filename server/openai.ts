import OpenAI from "openai";
import type { AIModelLink } from "@shared/schema";

// Lazy initialization - only create client if API key is available
function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Generate AI model links (direct to platform, user will paste copied prompt)
function generateAIModelLinks(prompt: string): AIModelLink[] {
  return [
    {
      name: "ChatGPT",
      url: "https://chat.openai.com/",
      icon: "SiOpenai"
    },
    {
      name: "Claude",
      url: "https://claude.ai/new",
      icon: "SiAnthropic"
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com/app",
      icon: "SiGoogle"
    },
    {
      name: "Cursor",
      url: "https://cursor.sh/",
      icon: "Code2"
    },
    {
      name: "Windsurf",
      url: "https://codeium.com/windsurf",
      icon: "Wind"
    },
    {
      name: "v0",
      url: "https://v0.dev/chat",
      icon: "Sparkles"
    },
    {
      name: "Bolt",
      url: "https://bolt.new/",
      icon: "Zap"
    },
    {
      name: "Replit Agent",
      url: "https://replit.com/",
      icon: "SiReplit"
    }
  ];
}

// Format prompt with clean professional structure (no emojis per repository rules)
function formatPromptWithMarkdown(prompt: string): string {
  return `# Optimized AI Coding Prompt

## Project Description
${prompt}

## Implementation Guidelines
- Break down the task into smaller, manageable components
- Follow best practices and modern development patterns
- Ensure code is clean, maintainable, and well-documented
- Include error handling and edge cases
- Test thoroughly before finalizing

## Success Criteria
- All requirements met
- Code is production-ready
- Performance optimized
- Security considerations addressed

---
Ready to use: Copy this prompt and paste it into your preferred AI coding assistant using the quick links below.`;
}

export async function optimizePrompt(originalPrompt: string): Promise<{
  optimizedPrompt: string;
  formattedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
  aiModelLinks: AIModelLink[];
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
    const optimized = result.optimizedPrompt || originalPrompt;
    
    // Estimate token counts (rough approximation: 1 token ≈ 4 characters)
    const originalTokenCount = Math.ceil(originalPrompt.length / 4);
    const optimizedTokenCount = Math.ceil(optimized.length / 4);

    return {
      optimizedPrompt: optimized,
      formattedPrompt: formatPromptWithMarkdown(optimized),
      originalTokenCount,
      optimizedTokenCount,
      aiModelLinks: generateAIModelLinks(optimized),
    };
  } catch (error: any) {
    console.error("OpenAI optimization failed:", error.message);
    return basicOptimization(originalPrompt);
  }
}

// Fallback optimization when OpenAI is not available
function basicOptimization(originalPrompt: string): {
  optimizedPrompt: string;
  formattedPrompt: string;
  originalTokenCount: number;
  optimizedTokenCount: number;
  aiModelLinks: AIModelLink[];
} {
  // Simple fallback: remove extra whitespace and common filler words
  const optimized = originalPrompt
    .replace(/\s+/g, ' ')
    .replace(/\b(lütfen|rica ediyorum|mümkünse|eğer olabilirse|çok|gerçekten|aslında)\b/gi, '')
    .trim();
  
  const finalPrompt = optimized || originalPrompt;
  const originalTokenCount = Math.ceil(originalPrompt.length / 4);
  const optimizedTokenCount = Math.ceil(finalPrompt.length / 4);
  
  return {
    optimizedPrompt: finalPrompt,
    formattedPrompt: formatPromptWithMarkdown(finalPrompt),
    originalTokenCount,
    optimizedTokenCount,
    aiModelLinks: generateAIModelLinks(finalPrompt),
  };
}
