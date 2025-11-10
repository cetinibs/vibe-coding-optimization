"use client";

import { useState } from "react";
import { aiServices } from "@/lib/aiServices";
import { estimateProjectComplexity } from "@/lib/complexityEstimator";
import { calculateAllServiceCosts, formatCurrency, formatTokenCount } from "@/lib/costCalculator";
import { CostEstimate } from "@/types";

export function CostEstimator() {
  const [appIdea, setAppIdea] = useState("");
  const [estimates, setEstimates] = useState<CostEstimate[]>([]);
  const [complexity, setComplexity] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!appIdea.trim()) return;

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const projectComplexity = estimateProjectComplexity(appIdea);
      const costs = calculateAllServiceCosts(aiServices, projectComplexity);

      setComplexity(projectComplexity.description);
      setEstimates(costs);
      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="appIdea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Uygulama Fikrinizi Açıklayın
        </label>
        <textarea
          id="appIdea"
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Örnek: E-ticaret sitesi için bir yönetim paneli geliştirmek istiyorum. Ürün ekleme, stok takibi, müşteri yönetimi ve satış raporları özelliklerini içermeli. React ve Node.js kullanarak responsive bir tasarım istiyorum."
          value={appIdea}
          onChange={(e) => setAppIdea(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Ne kadar detaylı açıklarsanız, tahmin o kadar doğru olur.
        </p>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!appIdea.trim() || isCalculating}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {isCalculating ? "Hesaplanıyor..." : "Maliyet Tahmini Yap"}
      </button>

      {complexity && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Proje Karmaşıklığı
          </h3>
          <p className="text-blue-800 dark:text-blue-200">{complexity}</p>
        </div>
      )}

      {estimates.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Maliyet Tahminleri
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {estimates.map((estimate, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                  {estimate.service}
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Input Tokens:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatTokenCount(estimate.inputTokens)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Output Tokens:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatTokenCount(estimate.outputTokens)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Toplam Token:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatTokenCount(estimate.totalTokens)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Input Maliyet:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatCurrency(estimate.inputCost)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Output Maliyet:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {formatCurrency(estimate.outputCost)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      Toplam Maliyet:
                    </span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(estimate.totalCost)}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Tahmini Etkileşim:</span>
                    <span>{estimate.estimatedInteractions} kez</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Not:</strong> Bu tahminler yaklaşık değerlerdir. Gerçek maliyetler,
              projenin gerçek karmaşıklığına, iterasyon sayısına ve kullanılan özelliklere göre değişebilir.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
