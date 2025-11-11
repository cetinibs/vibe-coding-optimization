import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PlatformCalculation } from "@shared/schema";

interface ResultsTableProps {
  data: PlatformCalculation[];
}

export function ResultsTable({ data }: ResultsTableProps) {
  if (!data || data.length === 0) return null;

  const lowestCost = Math.min(...data.map(p => p.cost));
  
  return (
    <Card data-testid="card-results-table">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">Platform Karşılaştırması</CardTitle>
        <CardDescription>
          Her platform için tahmini prompt sayısı, token kullanımı ve maliyet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead className="font-semibold">Platform</TableHead>
                <TableHead className="text-right font-semibold">Prompt Sayısı</TableHead>
                <TableHead className="text-right font-semibold">Token Kullanımı</TableHead>
                <TableHead className="text-right font-semibold">Maliyet (₺)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => {
                const isLowest = item.cost === lowestCost;
                return (
                  <TableRow 
                    key={item.platform}
                    className={`${index % 2 === 0 ? 'bg-muted/30' : ''} animate-in fade-in`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    data-testid={`row-platform-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <TableCell className="font-semibold flex items-center gap-2">
                      {item.platform}
                      {isLowest && (
                        <Badge variant="default" className="text-xs" data-testid="badge-lowest-cost">
                          En Uygun
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono" data-testid={`text-prompt-count-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.promptCount.toLocaleString('tr-TR')}
                    </TableCell>
                    <TableCell className="text-right font-mono" data-testid={`text-token-count-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.tokenCount.toLocaleString('tr-TR')}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold" data-testid={`text-cost-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
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
