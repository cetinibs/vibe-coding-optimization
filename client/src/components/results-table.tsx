import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { PlatformCalculation } from "@shared/schema";

interface ResultsTableProps {
  data: PlatformCalculation[];
}

export function ResultsTable({ data }: ResultsTableProps) {
  const { t } = useLanguage();
  
  if (!data || data.length === 0) return null;

  const lowestCost = Math.min(...data.map(p => p.cost));
  
  return (
    <Card className="glass-card" data-testid="card-results-table">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg gradient-bg-secondary flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-primary-foreground" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold gradient-text">{t.results.title}</h2>
        </div>
        <p className="text-muted-foreground ml-13">
          {t.results.subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-primary/20">
          <Table>
            <TableHeader className="sticky top-0 bg-gradient-to-r from-primary/5 to-secondary/5">
              <TableRow className="border-primary/20">
                <TableHead className="font-bold text-foreground">{t.results.platform}</TableHead>
                <TableHead className="text-right font-bold text-foreground">{t.results.prompts}</TableHead>
                <TableHead className="text-right font-bold text-foreground">{t.results.tokens}</TableHead>
                <TableHead className="text-right font-bold text-foreground">{t.results.cost}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const isLowest = item.cost === lowestCost;
                return (
                  <TableRow 
                    key={item.platform}
                    className={`border-primary/10 hover-elevate transition-all duration-200 animate-in fade-in ${
                      isLowest ? 'bg-primary/5' : index % 2 === 0 ? 'bg-background/50' : 'bg-muted/20'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    data-testid={`row-platform-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <TableCell className="font-semibold flex items-center gap-2">
                      <span className="text-foreground">{item.platform}</span>
                      {isLowest && (
                        <Badge className="text-xs gradient-bg-primary text-primary-foreground" data-testid="badge-lowest-cost">
                          {t.results.lowestCost}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground" data-testid={`text-prompt-count-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.promptCount.toLocaleString('tr-TR')}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground" data-testid={`text-token-count-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.tokenCount.toLocaleString('tr-TR')}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-foreground" data-testid={`text-cost-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                      ₺{item.cost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
