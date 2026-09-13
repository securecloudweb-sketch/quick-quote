import { pricingRules } from "@/data/pricingRules";
import { insuranceProducts, type InsuranceType, type Product } from "@/data/insuranceProducts";

export type FormData = Record<string, string | string[]>;

export type LineItem = { label: string; amount: number };

export type PremiumResult = {
  basePremium: number;
  adjustments: LineItem[];
  addOns: LineItem[];
  totalPremium: number;
  summary: LineItem[] | never[];
};

export type CoverageSummary = { label: string; value: string }[];

export const formatCurrency = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat(pricingRules.locale, {
    style: "currency",
    currency: pricingRules.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat(pricingRules.locale).format(value);

const num = (data: FormData, key: string) => {
  const raw = String(data[key] ?? "").replace(/,/g, "");
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const str = (data: FormData, key: string) => String(data[key] ?? "");

const list = (data: FormData, key: string) =>
  Array.isArray(data[key]) ? (data[key] as string[]) : [];

const bracketFactor = (
  brackets: readonly { maxAge: number; factor: number }[],
  age: number,
) => brackets.find((b) => age <= b.maxAge)?.factor ?? brackets[brackets.length - 1].factor;

const round = (n: number) => Math.round(n);

/**
 * Single entry point for premium calculation. Replace the internals with a real
 * rating engine (or an API call) without changing any component.
 */
export function calculatePremium(insuranceType: InsuranceType, formData: FormData): PremiumResult {
  const adjustments: LineItem[] = [];
  const addOns: LineItem[] = [];
  let basePremium = 0;

  if (insuranceType === "motor") {
    const r = pricingRules.motor;
    const value = num(formData, "vehicleValue");
    const coverage = str(formData, "coverage");

    basePremium =
      coverage === "comprehensive"
        ? value * r.coverageRates.comprehensive
        : r.thirdPartyFixedPremium;

    if (coverage === "comprehensive") {
      const typeFactor =
        r.vehicleTypeFactor[str(formData, "vehicleType") as keyof typeof r.vehicleTypeFactor] ?? 1;
      const ageFactor = bracketFactor(
        r.vehicleAgeFactor.brackets,
        num(formData, "vehicleAge"),
      );
      if (typeFactor !== 1)
        adjustments.push({
          label: "Vehicle type loading",
          amount: basePremium * (typeFactor - 1),
        });
      if (ageFactor !== 1)
        adjustments.push({
          label: "Vehicle age loading",
          amount: basePremium * typeFactor * (ageFactor - 1),
        });
    }

    for (const key of list(formData, "addOns")) {
      const addOn = r.addOns[key as keyof typeof r.addOns];
      if (addOn) addOns.push({ label: addOn.label, amount: addOn.amount });
    }
  }

  if (insuranceType === "life") {
    const r = pricingRules.life;
    const cover = num(formData, "coverAmount");
    const rate = bracketFactor(
      r.ageRateBrackets.map((b) => ({ maxAge: b.maxAge, factor: b.rate })),
      num(formData, "age"),
    );
    basePremium = cover * rate;

    const genderFactor = r.genderFactor[str(formData, "gender") as keyof typeof r.genderFactor] ?? 1;
    const durationFactor =
      r.durationFactor[str(formData, "duration") as unknown as keyof typeof r.durationFactor] ?? 1;

    if (genderFactor !== 1)
      adjustments.push({ label: "Gender adjustment", amount: basePremium * (genderFactor - 1) });
    if (durationFactor !== 1)
      adjustments.push({
        label: "Policy duration discount",
        amount: basePremium * genderFactor * (durationFactor - 1),
      });
  }

  if (insuranceType === "health") {
    const r = pricingRules.health;
    const people = Math.max(1, num(formData, "people"));
    const level = r.levelBase[str(formData, "level") as keyof typeof r.levelBase] ?? 0;
    basePremium = level * people;

    const ageFactor = bracketFactor(r.ageLoadingBrackets, num(formData, "age"));
    const durationFactor =
      r.durationFactor[str(formData, "duration") as unknown as keyof typeof r.durationFactor] ?? 1;

    if (ageFactor !== 1)
      adjustments.push({ label: "Age loading", amount: basePremium * (ageFactor - 1) });
    if (durationFactor !== 1)
      adjustments.push({
        label: "Multi-year term",
        amount: basePremium * ageFactor * (durationFactor - 1),
      });
  }

  if (insuranceType === "home") {
    const r = pricingRules.home;
    const value = num(formData, "propertyValue");
    const rate = r.levelRate[str(formData, "level") as keyof typeof r.levelRate] ?? 0;
    basePremium = value * rate;

    const typeFactor =
      r.propertyTypeFactor[str(formData, "propertyType") as keyof typeof r.propertyTypeFactor] ?? 1;
    const locationFactor =
      r.locationFactor[str(formData, "location") as keyof typeof r.locationFactor] ?? 1;

    if (typeFactor !== 1)
      adjustments.push({ label: "Property type loading", amount: basePremium * (typeFactor - 1) });
    if (locationFactor !== 1)
      adjustments.push({
        label: "Location adjustment",
        amount: basePremium * typeFactor * (locationFactor - 1),
      });
  }

  if (insuranceType === "travel") {
    const r = pricingRules.travel;
    const travellers = Math.max(1, num(formData, "travellers"));
    const perTraveller =
      r.destinationBase[str(formData, "destination") as keyof typeof r.destinationBase] ?? 0;
    basePremium = perTraveller * travellers;

    const weeks = Math.max(1, Math.ceil(num(formData, "days") / 7));
    const durationFactor = 1 + (weeks - 1) * r.durationFactorPerWeek;
    const ageFactor = bracketFactor(r.ageLoadingBrackets, num(formData, "age"));
    const levelFactor = r.levelFactor[str(formData, "level") as keyof typeof r.levelFactor] ?? 1;

    if (durationFactor !== 1)
      adjustments.push({ label: "Trip duration", amount: basePremium * (durationFactor - 1) });
    if (ageFactor !== 1)
      adjustments.push({
        label: "Traveller age loading",
        amount: basePremium * durationFactor * (ageFactor - 1),
      });
    if (levelFactor !== 1)
      adjustments.push({
        label: "Coverage level",
        amount: basePremium * durationFactor * ageFactor * (levelFactor - 1),
      });
  }

  basePremium = round(basePremium);
  const roundedAdjustments = adjustments.map((a) => ({ ...a, amount: round(a.amount) }));
  const totalPremium =
    basePremium +
    roundedAdjustments.reduce((s, a) => s + a.amount, 0) +
    addOns.reduce((s, a) => s + a.amount, 0);

  return {
    basePremium,
    adjustments: roundedAdjustments,
    addOns,
    totalPremium: Math.max(0, round(totalPremium)),
    summary: [],
  };
}

/** Human-readable echo of what the customer entered, for the results panel. */
export function buildCoverageSummary(
  insuranceType: InsuranceType,
  formData: FormData,
): CoverageSummary {
  const product = insuranceProducts.find((p) => p.id === insuranceType) as Product;
  const rows: CoverageSummary = [{ label: "Insurance type", value: product.name }];

  for (const field of product.fields) {
    if (field.kind === "addons") {
      const chosen = list(formData, field.name)
        .map((v) => field.options.find((o) => o.value === v)?.label)
        .filter(Boolean);
      rows.push({ label: field.label, value: chosen.length ? chosen.join(", ") : "None" });
      continue;
    }
    if (field.kind === "select") {
      const label = field.options.find((o) => o.value === str(formData, field.name))?.label;
      if (label) rows.push({ label: field.label, value: label });
      continue;
    }
    const value = num(formData, field.name);
    if (!value && value !== 0) continue;
    rows.push({
      label: field.label,
      value:
        field.kind === "currency"
          ? formatCurrency(value)
          : field.name === "days"
            ? `${formatNumber(value)} days`
            : field.name === "vehicleAge"
              ? `${formatNumber(value)} years`
              : formatNumber(value),
    });
  }

  return rows;
}

export function isComplete(product: Product, formData: FormData) {
  return product.fields.every((field) => {
    if (field.kind === "addons") return true;
    const raw = formData[field.name];
    if (field.kind === "select") return typeof raw === "string" && raw.length > 0;
    const value = Number(String(raw ?? "").replace(/,/g, ""));
    if (!String(raw ?? "").length || !Number.isFinite(value) || value < 0) return false;
    if (field.min !== undefined && value < field.min) return false;
    if (field.max !== undefined && value > field.max) return false;
    return true;
  });
}
