import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarOff, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Calculation } from "@shared/schema";

export default function FavoritesPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Giriş Gerekli",
        description: "Favorilerinizi görüntülemek için giriş yapın...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: favorites, isLoading } = useQuery<Calculation[]>({
    queryKey: ["/api/favorites"],
    enabled: isAuthenticated,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (calculationId: string) => {
      await apiRequest("DELETE", `/api/favorites/${calculationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Başarılı",
        description: "Favorilerden çıkarıldı",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Oturum Sona Erdi",
          description: "Tekrar giriş yapın...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Hata",
        description: "Favorilerden çıkarılamadı",
        variant: "destructive",
      });
    },
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Favori Hesaplamalar</h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Favori olarak işaretlediğiniz hesaplamalar
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-muted-foreground">Yükleniyor...</p>
        )}

        {!isLoading && favorites && favorites.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground" data-testid="text-empty-state">
                Henüz favori hesaplama eklemediniz
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {favorites?.map((calc) => {
            const results = calc.results as any[];
            const lowestCost = Math.min(...results.map((r: any) => r.cost));

            return (
              <Card key={calc.id} data-testid={`card-favorite-${calc.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {calc.appIdea.substring(0, 100)}
                        {calc.appIdea.length > 100 ? "..." : ""}
                      </CardTitle>
                      <CardDescription>
                        {calc.createdAt && format(new Date(calc.createdAt), "dd MMM yyyy HH:mm")}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavoriteMutation.mutate(calc.id!)}
                      disabled={removeFavoriteMutation.isPending}
                      data-testid={`button-unfavorite-${calc.id}`}
                    >
                      <StarOff className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">En Uygun Platform:</p>
                    {results.map((result: any) => {
                      if (result.cost === lowestCost) {
                        return (
                          <div key={result.platform} className="flex items-center justify-between py-2 px-4 bg-primary/10 rounded-md">
                            <span className="font-mono">{result.platform}</span>
                            <span className="font-mono font-bold">₺{result.cost.toFixed(2)}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
