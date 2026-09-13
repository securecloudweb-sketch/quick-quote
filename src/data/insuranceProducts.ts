export type InsuranceType = "motor" | "life" | "health" | "home" | "travel";

export type Field =
  | {
      kind: "currency" | "number";
      name: string;
      label: string;
      placeholder?: string;
      min?: number;
      max?: number;
      hint?: string;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      options: { value: string; label: string }[];
      hint?: string;
    }
  | {
      kind: "addons";
      name: string;
      label: string;
      options: { value: string; label: string; amount: number }[];
      hint?: string;
    };

export type Product = {
  id: InsuranceType;
  tag: string;
  name: string;
  description: string;
  fields: Field[];
};

export const insuranceProducts: Product[] = [
  {
    id: "motor",
    tag: "Motor",
    name: "Motor Insurance",
    description: "Protect your vehicle against accidents, theft and covered risks.",
    fields: [
      {
        kind: "currency",
        name: "vehicleValue",
        label: "Vehicle value",
        placeholder: "6,000,000",
        min: 100_000,
        max: 500_000_000,
      },
      {
        kind: "select",
        name: "vehicleType",
        label: "Vehicle type",
        options: [
          { value: "saloon", label: "Saloon" },
          { value: "suv", label: "SUV" },
          { value: "pickup", label: "Pickup" },
          { value: "bus", label: "Bus" },
          { value: "truck", label: "Truck" },
        ],
      },
      {
        kind: "number",
        name: "vehicleAge",
        label: "Vehicle age",
        placeholder: "4",
        min: 0,
        max: 40,
        hint: "Years since manufacture",
      },
      {
        kind: "select",
        name: "coverage",
        label: "Coverage",
        options: [
          { value: "thirdParty", label: "Third Party" },
          { value: "comprehensive", label: "Comprehensive" },
        ],
      },
      {
        kind: "addons",
        name: "addOns",
        label: "Optional add-ons",
        options: [
          { value: "theft", label: "Theft protection", amount: 12_000 },
          { value: "flood", label: "Flood protection", amount: 9_000 },
          { value: "windscreen", label: "Windscreen protection", amount: 6_500 },
          { value: "accident", label: "Personal accident cover", amount: 8_000 },
        ],
      },
    ],
  },
  {
    id: "life",
    tag: "Life",
    name: "Life Insurance",
    description: "Financial protection for you and your loved ones.",
    fields: [
      { kind: "number", name: "age", label: "Age", placeholder: "34", min: 18, max: 70 },
      {
        kind: "select",
        name: "gender",
        label: "Gender",
        options: [
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
        ],
      },
      {
        kind: "currency",
        name: "coverAmount",
        label: "Coverage amount",
        placeholder: "20,000,000",
        min: 500_000,
        max: 500_000_000,
      },
      {
        kind: "select",
        name: "duration",
        label: "Policy duration",
        options: [
          { value: "5", label: "5 years" },
          { value: "10", label: "10 years" },
          { value: "20", label: "20 years" },
          { value: "30", label: "30 years" },
        ],
      },
    ],
  },
  {
    id: "health",
    tag: "Health",
    name: "Health Insurance",
    description: "Cover eligible healthcare expenses and medical services.",
    fields: [
      { kind: "number", name: "age", label: "Age", placeholder: "31", min: 0, max: 90 },
      {
        kind: "number",
        name: "people",
        label: "Number of people to cover",
        placeholder: "3",
        min: 1,
        max: 15,
      },
      {
        kind: "select",
        name: "level",
        label: "Coverage level",
        options: [
          { value: "basic", label: "Basic" },
          { value: "standard", label: "Standard" },
          { value: "premium", label: "Premium" },
        ],
      },
      {
        kind: "select",
        name: "duration",
        label: "Policy duration",
        options: [
          { value: "1", label: "1 year" },
          { value: "2", label: "2 years" },
          { value: "3", label: "3 years" },
        ],
      },
    ],
  },
  {
    id: "home",
    tag: "Home",
    name: "Home Insurance",
    description: "Protect your home and personal property against risks.",
    fields: [
      {
        kind: "currency",
        name: "propertyValue",
        label: "Property value",
        placeholder: "75,000,000",
        min: 1_000_000,
        max: 5_000_000_000,
      },
      {
        kind: "select",
        name: "propertyType",
        label: "Property type",
        options: [
          { value: "apartment", label: "Apartment" },
          { value: "detached", label: "Detached House" },
          { value: "duplex", label: "Duplex" },
          { value: "commercial", label: "Commercial Property" },
        ],
      },
      {
        kind: "select",
        name: "location",
        label: "Location",
        options: [
          { value: "lagos", label: "Lagos" },
          { value: "abuja", label: "Abuja" },
          { value: "portHarcourt", label: "Port Harcourt" },
          { value: "otherUrban", label: "Other urban area" },
          { value: "rural", label: "Rural area" },
        ],
      },
      {
        kind: "select",
        name: "level",
        label: "Coverage level",
        options: [
          { value: "basic", label: "Basic" },
          { value: "standard", label: "Standard" },
          { value: "comprehensive", label: "Comprehensive" },
        ],
      },
    ],
  },
  {
    id: "travel",
    tag: "Travel",
    name: "Travel Insurance",
    description: "Protection while travelling locally or internationally.",
    fields: [
      {
        kind: "select",
        name: "destination",
        label: "Destination",
        options: [
          { value: "nigeria", label: "Nigeria" },
          { value: "africa", label: "Africa" },
          { value: "europe", label: "Europe" },
          { value: "worldwide", label: "Worldwide" },
        ],
      },
      { kind: "number", name: "age", label: "Traveller age", placeholder: "38", min: 0, max: 90 },
      {
        kind: "number",
        name: "days",
        label: "Trip duration",
        placeholder: "14",
        min: 1,
        max: 365,
        hint: "Number of days",
      },
      {
        kind: "number",
        name: "travellers",
        label: "Number of travellers",
        placeholder: "2",
        min: 1,
        max: 20,
      },
      {
        kind: "select",
        name: "level",
        label: "Coverage level",
        options: [
          { value: "basic", label: "Basic" },
          { value: "standard", label: "Standard" },
          { value: "premium", label: "Premium" },
        ],
      },
    ],
  },
];

export const productById = (id: InsuranceType) =>
  insuranceProducts.find((p) => p.id === id)!;
