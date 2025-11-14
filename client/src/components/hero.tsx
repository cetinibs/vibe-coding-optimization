import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { t } = useLanguage();
  
  const scrollToForm = () => {
    const formElement = document.getElementById('app-idea');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formElement.focus();
    }
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg-hero" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 hover-glow" data-testid="badge-hero-label">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">{t.hero.platforms}</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" data-testid="text-hero-title">
          {t.hero.title}
        </h1>
        
        <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="gradient-bg-primary text-primary-foreground hover-glow"
            data-testid="button-hero-cta"
          >
            <Calculator className="w-5 h-5 mr-2" />
            {t.form.calculate}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            onClick={scrollToForm}
            className="glass-card"
            data-testid="button-hero-secondary"
          >
            <Zap className="w-5 h-5 mr-2" />
            {t.form.optimize}
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
            {t.hero.platforms}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3" data-testid="container-platforms">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="glass-card px-4 py-2 rounded-lg hover-elevate active-elevate-2 transition-all"
                data-testid={`badge-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span className="text-sm font-mono font-semibold">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
