import { useState } from "react";
import { X } from "lucide-react";
import type { InsuranceType } from "@/data/insuranceProducts";
import {
  buildCoverageSummary,
  calculatePremium,
  formatCurrency,
  type FormData,
} from "@/lib/premium";

export function PremiumResult({
  insuranceType,
  formData,
  onRestart,
}: {
  insuranceType: InsuranceType;
  formData: FormData;
  onRestart: () => void;
}) {
  const [quoteSent, setQuoteSent] = useState(false);
  const result = calculatePremium(insuranceType, formData);
  const summary = buildCoverageSummary(insuranceType, formData);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
      <div className="flex flex-col border-b border-border pb-6 md:col-span-2 md:border-b-0 md:border-r md:pb-0 md:pr-6">
        <p className="eyebrow text-primary">Your estimated premium</p>
        <div className="mt-2 overflow-hidden">
          <p className="fig-wipe font-display text-5xl font-extrabold leading-none tracking-tight sm:text-[3.4rem]">
            {formatCurrency(result.totalPremium)}
          </p>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Annual premium · 12 months</p>
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <button
            type="button"
            onClick={() => setQuoteSent(true)}
            className="rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-border transition-all hover:bg-foreground/90"
          >
            Get a Quote
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
          >
            Start Again
          </button>
        </div>
      </div>

      <div className="md:col-span-3">
        <p className="eyebrow text-muted-foreground">Coverage summary</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
          {summary.map((row) => (
            <div key={row.label} className="col-span-2 grid grid-cols-2 gap-x-6">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-right font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className="eyebrow mt-6 text-muted-foreground">Premium breakdown</p>
        <div className="mt-3 divide-y divide-border text-sm">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground">Base premium</span>
            <span className="font-mono text-[13px]">{formatCurrency(result.basePremium)}</span>
          </div>
          {result.adjustments.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2.5">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono text-[13px] text-primary">
                {item.amount < 0 ? "− " : "+ "}
                {formatCurrency(Math.abs(item.amount))}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-muted-foreground">Add-ons</span>
            <span className="font-mono text-[13px]">
              + {formatCurrency(result.addOns.reduce((s, a) => s + a.amount, 0))}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-display font-bold">Estimated total</span>
            <span className="font-mono font-bold">{formatCurrency(result.totalPremium)}</span>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
          Premium shown is an illustrative estimate for demonstration purposes and may differ from
          the final quotation.
        </p>
      </div>

      {quoteSent && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 p-5 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            className="rise-in w-full max-w-sm rounded-3xl bg-card p-6 shadow-frost ring-1 ring-border"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-lg font-bold tracking-tight">Request received</p>
              <button
                type="button"
                onClick={() => setQuoteSent(false)}
                aria-label="Close"
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you. A representative will contact you to complete your quotation.
            </p>
            <button
              type="button"
              onClick={() => setQuoteSent(false)}
              className="mt-5 w-full rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-foreground/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
