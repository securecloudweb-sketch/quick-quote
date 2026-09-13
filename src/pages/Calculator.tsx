import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { InsuranceSelector } from "@/components/InsuranceSelector";
import { CalculatorForm } from "@/components/CalculatorForm";
import { PremiumResult } from "@/components/PremiumResult";
import { productById, type InsuranceType } from "@/data/insuranceProducts";
import { isComplete, type FormData } from "@/lib/premium";

export function Calculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [insuranceType, setInsuranceType] = useState<InsuranceType | null>(null);
  const [formData, setFormData] = useState<FormData>({});

  const product = insuranceType ? productById(insuranceType) : null;
  const detailsComplete = product ? isComplete(product, formData) : false;
  const canContinue = step === 1 ? Boolean(insuranceType) : detailsComplete;

  const selectProduct = (id: InsuranceType) => {
    setInsuranceType(id);
    setFormData({});
  };

  const restart = () => {
    setInsuranceType(null);
    setFormData({});
    setStep(1);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-glow-1 blur-[120px]" />
        <div className="absolute -right-24 top-1/3 h-[460px] w-[460px] rounded-full bg-glow-2 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-glow-3 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <Header />

        <div className="rise-in pb-8 pt-4 text-center">
          <p className="eyebrow text-primary">Premium estimator</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Calculate Your Insurance Premium
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            Get an instant estimate based on your selected product and coverage.
          </p>
        </div>

        <main className="rounded-[28px] border border-border bg-surface p-5 shadow-frost backdrop-blur-2xl sm:p-8">
          <ProgressIndicator current={step} />

          {step === 1 && (
            <InsuranceSelector selected={insuranceType} onSelect={selectProduct} />
          )}

          {step === 2 && product && (
            <CalculatorForm
              product={product}
              formData={formData}
              onChange={(name, value) =>
                setFormData((prev) => ({ ...prev, [name]: value }))
              }
            />
          )}

          {step === 3 && insuranceType && (
            <div className="mt-7">
              <PremiumResult
                insuranceType={insuranceType}
                formData={formData}
                onRestart={restart}
              />
            </div>
          )}

          {step !== 3 && (
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden /> Back
              </button>
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep(step === 1 ? 2 : 3)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-6 py-2.5 text-sm font-semibold text-primary-foreground ring-1 ring-border transition-all hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 1 ? "Continue" : "Calculate Premium"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </main>

        <footer className="eyebrow py-10 text-center text-muted-foreground">
          ABC Insurance · Demo prototype
        </footer>
      </div>
    </div>
  );
}
