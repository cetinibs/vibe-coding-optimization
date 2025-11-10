"use client";

import { useState } from "react";
import { optimizePrompt } from "@/lib/promptOptimizer";
import { OptimizationResult } from "@/types";

export function PromptOptimizer() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    if (!prompt.trim()) return;

    setIsOptimizing(true);

    // Simulate optimization delay for better UX
    setTimeout(() => {
      const optimization = optimizePrompt(prompt);
      setResult(optimization);
      setIsOptimizing(false);
    }, 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: Show a toast notification
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Promptunuzu Girin
        </label>
        <textarea
          id="prompt"
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          placeholder="Lütfen bana çok güzel bir e-ticaret sitesi yapabilir misin? Gerçekten harika olmalı ve aslında kullanıcı dostu olmalı sanırım. Belki login sistemi de ekleyebilirsin. Teşekkür ederim."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          AI ile daha verimli çalışmak için promptunuzu optimize edin.
        </p>
      </div>

      <button
        onClick={handleOptimize}
        disabled={!prompt.trim() || isOptimizing}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
      >
        {isOptimizing ? "Optimize Ediliyor..." : "Promptu Optimize Et"}
      </button>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {result.tokensSaved}
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-300">Token Tasarrufu</div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.percentageSaved.toFixed(1)}%
              </div>
              <div className="text-sm text-green-800 dark:text-green-300">Tasarruf Oranı</div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {result.optimizedTokenCount}
              </div>
              <div className="text-sm text-purple-800 dark:text-purple-300">Optimize Token</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  Orijinal Prompt
                </h4>
                <button
                  onClick={() => handleCopy(result.originalPrompt)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Kopyala
                </button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border border-gray-300 dark:border-gray-600">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {result.originalPrompt}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Token: {result.originalTokenCount}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  Optimize Edilmiş Prompt
                </h4>
                <button
                  onClick={() => handleCopy(result.optimizedPrompt)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Kopyala
                </button>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-300 dark:border-green-700">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {result.optimizedPrompt}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  Token: {result.optimizedTokenCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
              Optimizasyon Önerileri
            </h4>
            <ul className="space-y-1">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 İpuçları
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• Net ve doğrudan talimatlar kullanın</li>
              <li>• Gereksiz nezaket ifadelerinden kaçının</li>
              <li>• Spesifik teknolojileri ve gereksinimleri belirtin</li>
              <li>• Özellikleri madde madde listeleyin</li>
              <li>• Belirsiz ifadeler yerine kesin terimler kullanın</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
