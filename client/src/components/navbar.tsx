import { Calculator, History, Star, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "wouter";
import type { User } from "@shared/schema";

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const typedUser = user as User | undefined;

  return (
    <nav className="sticky top-0 z-50 glass-navbar h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between gap-4">
        <button 
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1"
          data-testid="button-home"
        >
          <Calculator className="w-6 h-6 text-primary" data-testid="icon-logo" />
          <span className="font-semibold text-lg" data-testid="text-app-name">AI Maliyet Hesaplayıcı</span>
        </button>
        
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation("/history")}
                data-testid="button-history"
              >
                <History className="w-4 h-4 mr-2" />
                Geçmiş
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation("/favorites")}
                data-testid="button-favorites"
              >
                <Star className="w-4 h-4 mr-2" />
                Favoriler
              </Button>
              
              <div className="flex items-center gap-2 pl-2 border-l">
                <Avatar className="w-8 h-8" data-testid="avatar-user">
                  <AvatarImage src={typedUser?.profileImageUrl || ""} style={{ objectFit: "cover" }} />
                  <AvatarFallback>
                    {typedUser?.firstName?.[0] || typedUser?.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <a href="/api/logout" data-testid="link-logout">
                  <Button variant="ghost" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış
                  </Button>
                </a>
              </div>
            </>
          )}
          
          {!isAuthenticated && (
            <a href="/api/login" data-testid="link-login">
              <Button variant="default" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Giriş Yap
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
