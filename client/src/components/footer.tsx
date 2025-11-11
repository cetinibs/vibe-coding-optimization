export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
          <span data-testid="text-copyright">© {currentYear} AI Maliyet Hesaplayıcı</span>
          <span className="hidden sm:inline">•</span>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors"
            data-testid="link-docs"
          >
            Dokümantasyon
          </a>
          <span className="hidden sm:inline">•</span>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            data-testid="link-footer-github"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
