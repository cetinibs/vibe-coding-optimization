import { Calculator, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InputFormProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
  onOptimize: () => void;
  onReset: () => void;
  isCalculating: boolean;
  isOptimizing: boolean;
  error?: string;
}

export function InputForm({
  value,
  onChange,
  onCalculate,
  onOptimize,
  onReset,
  isCalculating,
  isOptimizing,
  error,
}: InputFormProps) {
  const charCount = value.length;
  const isValid = charCount >= 10;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="app-idea" className="text-lg font-semibold">
          Uygulama Fikrinizi Girin
        </Label>
        <Textarea
          id="app-idea"
          data-testid="input-app-idea"
          placeholder="Örnek: E-ticaret sitesi için ürün öneri sistemi geliştirmek istiyorum. Kullanıcıların geçmiş alışverişlerine göre kişiselleştirilmiş öneriler sunacak..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-none text-base"
          aria-label="Uygulama fikri girişi"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {!isValid && charCount > 0 && (
              <span className="text-destructive">En az 10 karakter gerekli</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground" data-testid="text-char-count">
            {charCount} karakter
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" data-testid="alert-error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onCalculate}
          disabled={!isValid || isCalculating || isOptimizing}
          className="flex-1"
          size="lg"
          data-testid="button-calculate"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {isCalculating ? "Hesaplanıyor..." : "Hesapla"}
        </Button>

        <Button
          onClick={onOptimize}
          disabled={!isValid || isCalculating || isOptimizing}
          variant="secondary"
          className="flex-1"
          size="lg"
          data-testid="button-optimize"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isOptimizing ? "Optimize Ediliyor..." : "Promptu Optimize Et"}
        </Button>

        <Button
          onClick={onReset}
          disabled={isCalculating || isOptimizing}
          variant="outline"
          size="lg"
          data-testid="button-reset"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
