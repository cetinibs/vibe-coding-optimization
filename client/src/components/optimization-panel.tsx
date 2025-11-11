import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, TrendingDown } from "lucide-react";
import type { OptimizationResponse } from "@shared/schema";

interface OptimizationPanelProps {
  data: OptimizationResponse;
}

export function OptimizationPanel({ data }: OptimizationPanelProps) {
  return (
    <Card data-testid="card-optimization">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">Prompt Optimizasyonu</CardTitle>
        <CardDescription>
          AI tarafından optimize edilmiş prompt ile karşılaştırma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Badge variant="default" className="text-base px-4 py-2" data-testid="badge-token-reduction">
            <ArrowDown className="w-4 h-4 mr-1" />
            %{data.tokenReduction.toFixed(1)} Token Azalması
          </Badge>
          <Badge variant="secondary" className="text-base px-4 py-2" data-testid="badge-cost-savings">
            <TrendingDown className="w-4 h-4 mr-1" />
            %{data.costSavings.toFixed(1)} Maliyet Tasarrufu
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Orijinal Prompt</h3>
              <span className="text-sm text-muted-foreground font-mono" data-testid="text-original-tokens">
                {data.originalTokenCount.toLocaleString('tr-TR')} token
              </span>
            </div>
            <div 
              className="bg-muted/50 rounded-md p-4 border font-mono text-sm whitespace-pre-wrap min-h-[150px]"
              data-testid="text-original-prompt"
            >
              {data.originalPrompt}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Optimize Edilmiş Prompt</h3>
              <span className="text-sm text-muted-foreground font-mono" data-testid="text-optimized-tokens">
                {data.optimizedTokenCount.toLocaleString('tr-TR')} token
              </span>
            </div>
            <div 
              className="bg-primary/5 rounded-md p-4 border border-primary/20 font-mono text-sm whitespace-pre-wrap min-h-[150px]"
              data-testid="text-optimized-prompt"
            >
              {data.optimizedPrompt}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
