import type { Field, Product } from "@/data/insuranceProducts";
import { formatCurrency, type FormData } from "@/lib/premium";

const digitsOnly = (v: string) => v.replace(/[^\d]/g, "");
const grouped = (v: string) =>
  v ? new Intl.NumberFormat("en-US").format(Number(v)) : "";

function FieldError({ message }: { message: string }) {
  return <p className="mt-1.5 text-[11px] text-destructive">{message}</p>;
}

function fieldError(field: Field, raw: unknown): string | null {
  if (field.kind === "select" || field.kind === "addons") return null;
  const text = String(raw ?? "");
  if (!text) return null;
  const value = Number(text.replace(/,/g, ""));
  if (!Number.isFinite(value) || value < 0) return "Enter a valid positive number.";
  if (field.min !== undefined && value < field.min)
    return `Minimum is ${field.kind === "currency" ? formatCurrency(field.min) : field.min}.`;
  if (field.max !== undefined && value > field.max)
    return `Maximum is ${field.kind === "currency" ? formatCurrency(field.max) : field.max}.`;
  return null;
}

export function CalculatorForm({
  product,
  formData,
  onChange,
}: {
  product: Product;
  formData: FormData;
  onChange: (name: string, value: string | string[]) => void;
}) {
  return (
    <div>
      <div className="mt-7">
        <p className="font-display text-xl font-bold tracking-tight">{product.name} details</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us a little about what you're covering.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {product.fields.map((field, i) => {
          const raw = formData[field.name];
          const error = fieldError(field, raw);

          return (
            <div
              key={field.name}
              className={[
                "rise-in",
                field.kind === "addons" ? "sm:col-span-2" : "",
              ].join(" ")}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <label
                htmlFor={field.name}
                className="eyebrow block text-muted-foreground"
              >
                {field.label}
              </label>

              {field.kind === "select" && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {field.options.map((option) => {
                    const active = raw === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(field.name, option.value)}
                        aria-pressed={active}
                        className={[
                          "rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all ring-1",
                          active
                            ? "bg-foreground text-primary-foreground ring-foreground"
                            : "bg-surface-solid text-muted-foreground ring-border hover:text-foreground hover:ring-primary",
                        ].join(" ")}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {field.kind === "addons" && (
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {field.options.map((option) => {
                    const chosen = Array.isArray(raw) ? raw : [];
                    const active = chosen.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          onChange(
                            field.name,
                            active
                              ? chosen.filter((v) => v !== option.value)
                              : [...chosen, option.value],
                          )
                        }
                        aria-pressed={active}
                        className={[
                          "flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] transition-all ring-1",
                          active
                            ? "bg-primary/5 font-medium text-foreground ring-primary"
                            : "bg-surface-solid text-muted-foreground ring-border hover:ring-primary",
                        ].join(" ")}
                      >
                        <span>{option.label}</span>
                        <span className="font-mono text-[12px]">
                          +{formatCurrency(option.amount)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {(field.kind === "currency" || field.kind === "number") && (
                <div className="relative mt-2">
                  {field.kind === "currency" && (
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[13px] text-muted-foreground">
                      $
                    </span>
                  )}
                  <input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={field.placeholder}
                    value={
                      field.kind === "currency"
                        ? grouped(digitsOnly(String(raw ?? "")))
                        : String(raw ?? "")
                    }
                    onChange={(e) => onChange(field.name, digitsOnly(e.target.value))}
                    className={[
                      "w-full rounded-xl bg-surface-solid py-3 font-mono text-[14px] text-foreground outline-none ring-1 transition-all placeholder:text-muted-foreground/60",
                      field.kind === "currency" ? "pl-8 pr-3.5" : "px-3.5",
                      error ? "ring-destructive" : "ring-border focus:ring-primary",
                    ].join(" ")}
                  />
                </div>
              )}

              {field.hint && !error && (
                <p className="mt-1.5 text-[11px] text-muted-foreground">{field.hint}</p>
              )}
              {error && <FieldError message={error} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
