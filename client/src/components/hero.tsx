import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const platforms = [
  "Codex CLI",
  "Claude Code",
  "Gemini CLI",
  "Cursor",
  "Windsurf",
  "Trea",
  "Replit",
  "v0",
  "Bolt"
];

export function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('app-idea');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formElement.focus();
    }
  };

  return (
    <section className="py-16 lg:py-24 border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4" data-testid="text-hero-title">
          AI Platformlarının Maliyetini Karşılaştırın
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
          Uygulama fikrinizi girin, farklı AI kod platformlarında ortalama ne kadar prompt, 
          token ve maliyet gerektireceğini anında öğrenin. Prompt'larınızı optimize edin, 
          maliyetleri düşürün.
        </p>

        <Button 
          size="lg" 
          onClick={scrollToForm}
          className="mb-12"
          data-testid="button-hero-cta"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Hesaplamaya Başla
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-3" data-testid="container-platforms">
          {platforms.map((platform) => (
            <Badge 
              key={platform} 
              variant="secondary" 
              className="text-sm font-mono"
              data-testid={`badge-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {platform}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
