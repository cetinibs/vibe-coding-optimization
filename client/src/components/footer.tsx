import { Github, FileText, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-primary/20 py-12 mt-auto bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-text">
              {t.navbar.appName}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a 
              href="#" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate"
              data-testid="link-docs"
            >
              <FileText className="w-4 h-4" />
              {t.footer.documentation}
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate"
              data-testid="link-footer-github"
            >
              <Github className="w-4 h-4" />
              {t.footer.github}
            </a>
          </div>
          
          <div className="text-sm text-muted-foreground/80" data-testid="text-copyright">
            © {currentYear} {t.navbar.appName}
          </div>
        </div>
      </div>
    </footer>
  );
}
