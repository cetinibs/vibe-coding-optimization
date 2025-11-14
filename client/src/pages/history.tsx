import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Star, StarOff } from "lucide-react";
import { format } from "date-fns";
import type { Calculation } from "@shared/schema";

export default function HistoryPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: t.common.loginRequired,
        description: t.common.loginRequiredDesc,
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast, t]);

  const { data: calculations, isLoading } = useQuery<Calculation[]>({
    queryKey: ["/api/calculations"],
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/calculations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calculations"] });
      toast({
        title: t.common.success,
        description: t.common.removed,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: t.common.sessionExpired,
          description: t.common.sessionExpiredDesc,
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: t.common.error,
        description: t.common.deleteFailed,
        variant: "destructive",
      });
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ calculationId, isFavorite }: { calculationId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        await apiRequest("DELETE", `/api/favorites/${calculationId}`);
      } else {
        await apiRequest("POST", "/api/favorites", { calculationId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/calculations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">{t.history.title}</h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            {t.history.empty}
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-muted-foreground">{t.common.loading}</p>
        )}

        {!isLoading && calculations && calculations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground" data-testid="text-empty-state">
                {t.history.emptyDesc}
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {calculations?.map((calc) => {
            const results = calc.results as any[];
            const lowestCost = Math.min(...results.map((r: any) => r.cost));

            return (
              <Card key={calc.id} data-testid={`card-calculation-${calc.id}`}>
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
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavoriteMutation.mutate({ 
                          calculationId: calc.id!, 
                          isFavorite: false 
                        })}
                        data-testid={`button-favorite-${calc.id}`}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(calc.id!)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${calc.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p className="font-semibold">{t.history.lowestPlatform}</p>
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
