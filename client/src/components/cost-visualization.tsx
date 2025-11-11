import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { PlatformCalculation } from "@shared/schema";

interface CostVisualizationProps {
  data: PlatformCalculation[];
}

export function CostVisualization({ data }: CostVisualizationProps) {
  if (!data || data.length === 0) return null;

  const chartData = [...data]
    .sort((a, b) => a.cost - b.cost)
    .map(item => ({
      name: item.platform,
      cost: item.cost,
    }));

  const lowestCost = Math.min(...data.map(p => p.cost));

  return (
    <Card data-testid="card-visualization">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-3xl">Maliyet Görselleştirmesi</CardTitle>
        <CardDescription>
          Platform maliyetlerinin karşılaştırmalı grafik görünümü
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                type="number" 
                tickFormatter={(value) => `₺${value.toFixed(2)}`}
                className="text-sm"
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100}
                className="text-sm font-mono"
              />
              <Tooltip
                formatter={(value: number) => [`₺${value.toFixed(2)}`, 'Maliyet']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <Bar 
                dataKey="cost" 
                radius={[0, 4, 4, 0]}
                label={{ position: 'right', formatter: (value: number) => `₺${value.toFixed(2)}`, fontSize: 12 }}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.cost === lowestCost ? 'hsl(var(--primary))' : 'hsl(var(--chart-1))'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
