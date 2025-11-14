import { Calculator, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { t } = useLanguage();
  const charCount = value.length;
  const isValid = charCount >= 10;

  return (
    <div className="glass-card p-8 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-bg-primary flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-foreground" />
          </div>
          <Label htmlFor="app-idea" className="text-2xl font-bold gradient-text">
            {t.form.title}
          </Label>
        </div>
        
        <Textarea
          id="app-idea"
          data-testid="input-app-idea"
          placeholder={t.form.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[200px] resize-none text-base bg-background/50 border-primary/20 focus:border-primary/40 transition-colors"
          aria-label={t.form.title}
        />
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {!isValid && charCount > 0 && (
              <span className="text-destructive font-medium">{t.form.minLength}</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground font-medium" data-testid="text-char-count">
            {charCount} / 1000
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/10" data-testid="alert-error">
          <AlertDescription className="font-medium">{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onCalculate}
          disabled={!isValid || isCalculating || isOptimizing}
          className="flex-1 gradient-bg-primary text-primary-foreground hover-glow"
          size="lg"
          data-testid="button-calculate"
        >
          <Calculator className="w-5 h-5 mr-2" />
          {isCalculating ? t.form.calculating : t.form.calculate}
        </Button>

        <Button
          onClick={onOptimize}
          disabled={!isValid || isCalculating || isOptimizing}
          variant="outline"
          className="flex-1 border-primary/30"
          size="lg"
          data-testid="button-optimize"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isOptimizing ? t.form.optimizing : t.form.optimize}
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
