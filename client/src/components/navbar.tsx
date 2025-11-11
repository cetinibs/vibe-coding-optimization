import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary" data-testid="icon-logo" />
          <span className="font-semibold text-lg" data-testid="text-app-name">AI Maliyet Hesaplayıcı</span>
        </div>
        
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-github"
        >
          <Button variant="ghost" size="sm">
            GitHub
          </Button>
        </a>
      </div>
    </nav>
  );
}
