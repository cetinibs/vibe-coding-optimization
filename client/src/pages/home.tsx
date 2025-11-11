import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { InputForm } from "@/components/input-form";
import { ResultsTable } from "@/components/results-table";
import { CostVisualization } from "@/components/cost-visualization";
import { OptimizationPanel } from "@/components/optimization-panel";
import { Footer } from "@/components/footer";
import type { CalculationResponse, OptimizationResponse } from "@shared/schema";

export default function HomePage() {
  const [appIdea, setAppIdea] = useState("");
  const [calculationResult, setCalculationResult] = useState<CalculationResponse | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResponse | null>(null);

  const calculateMutation = useMutation({
    mutationFn: async (idea: string) => {
      const response = await apiRequest("POST", "/api/calculate", { appIdea: idea });
      return response as CalculationResponse;
    },
    onSuccess: (data) => {
      setCalculationResult(data);
      setOptimizationResult(null);
    },
  });

  const optimizeMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/optimize", { originalPrompt: prompt });
      return response as OptimizationResponse;
    },
    onSuccess: (data) => {
      setOptimizationResult(data);
    },
  });

  const handleCalculate = () => {
    if (appIdea.trim().length >= 10) {
      calculateMutation.mutate(appIdea);
    }
  };

  const handleOptimize = () => {
    if (appIdea.trim().length >= 10) {
      optimizeMutation.mutate(appIdea);
    }
  };

  const handleReset = () => {
    setAppIdea("");
    setCalculationResult(null);
    setOptimizationResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <InputForm
            value={appIdea}
            onChange={setAppIdea}
            onCalculate={handleCalculate}
            onOptimize={handleOptimize}
            onReset={handleReset}
            isCalculating={calculateMutation.isPending}
            isOptimizing={optimizeMutation.isPending}
            error={calculateMutation.error?.message || optimizeMutation.error?.message}
          />

          {calculationResult && (
            <div className="mt-12 space-y-12">
              <ResultsTable data={calculationResult.platforms} />
              <CostVisualization data={calculationResult.platforms} />
            </div>
          )}

          {optimizationResult && (
            <div className="mt-12">
              <OptimizationPanel data={optimizationResult} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
