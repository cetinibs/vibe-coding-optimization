"use client";

import { useState } from "react";
import { CostEstimator } from "@/components/CostEstimator";
import { PromptOptimizer } from "@/components/PromptOptimizer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"estimator" | "optimizer">("estimator");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            AI Uygulama Maliyet Tahmincisi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Yapay zeka destekli geliştirme araçları için maliyet tahmini ve prompt optimizasyonu
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("estimator")}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === "estimator"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Maliyet Tahmini
              </button>
              <button
                onClick={() => setActiveTab("optimizer")}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === "optimizer"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Prompt Optimizasyon
              </button>
            </div>

            <div className="p-6">
              {activeTab === "estimator" ? <CostEstimator /> : <PromptOptimizer />}
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-600 dark:text-gray-400">
          <p>AI destekli geliştirme araçları için akıllı maliyet analizi</p>
        </footer>
      </div>
    </main>
  );
}
