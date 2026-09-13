import { Check } from "lucide-react";
import { insuranceProducts, type InsuranceType } from "@/data/insuranceProducts";

export function InsuranceSelector({
  selected,
  onSelect,
}: {
  selected: InsuranceType | null;
  onSelect: (id: InsuranceType) => void;
}) {
  return (
    <div>
      <div className="mt-7">
        <p className="font-display text-xl font-bold tracking-tight">
          What would you like to insure?
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Choose a product to continue.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {insuranceProducts.map((product, i) => {
          const isSelected = selected === product.id;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(product.id)}
              aria-pressed={isSelected}
              className={[
                "rise-in group relative rounded-2xl p-4 text-left ring-1 ring-border transition-all",
                isSelected
                  ? "border-2 border-primary bg-primary/5 hover:bg-primary/10"
                  : "border border-border bg-surface-solid hover:-translate-y-0.5 hover:border-primary",
                i === insuranceProducts.length - 1 ? "sm:col-span-2" : "",
              ].join(" ")}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {isSelected && (
                <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden />
                </span>
              )}
              <span
                className={[
                  "eyebrow tracking-[0.15em]",
                  isSelected ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              >
                {product.tag}
              </span>
              <p className="mt-2 font-display text-[15px] font-bold tracking-tight">
                {product.name}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                {product.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
