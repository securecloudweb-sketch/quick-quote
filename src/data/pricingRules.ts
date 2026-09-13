/**
 * DEMO PRICING CONFIGURATION
 * -----------------------------------------------------------------------------
 * All rates below are illustrative demo figures for a proof-of-concept only.
 * They are NOT actual insurance industry rates.
 *
 * Everything the calculation engine needs lives in this single object so it can
 * be swapped for a real rating engine later without touching the UI.
 */

export const pricingRules = {
  currency: "NGN",

  motor: {
    coverageRates: {
      comprehensive: 0.03, // ~3% of vehicle value
      thirdParty: 0, // fixed premium instead
    },
    thirdPartyFixedPremium: 15_000,
    vehicleTypeFactor: {
      saloon: 1,
      suv: 1.15,
      pickup: 1.1,
      bus: 1.25,
      truck: 1.35,
    },
    vehicleAgeFactor: {
      // upper bound (inclusive) of vehicle age in years -> factor
      brackets: [
        { maxAge: 3, factor: 1 },
        { maxAge: 7, factor: 1.08 },
        { maxAge: 12, factor: 1.18 },
        { maxAge: 99, factor: 1.3 },
      ],
    },
    addOns: {
      theft: { label: "Theft protection", amount: 12_000 },
      flood: { label: "Flood protection", amount: 9_000 },
      windscreen: { label: "Windscreen protection", amount: 6_500 },
      accident: { label: "Personal accident cover", amount: 8_000 },
    },
  },

  life: {
    // annual rate per ₦1 of cover, by age bracket
    ageRateBrackets: [
      { maxAge: 29, rate: 0.0022 },
      { maxAge: 39, rate: 0.0031 },
      { maxAge: 49, rate: 0.0048 },
      { maxAge: 59, rate: 0.0075 },
      { maxAge: 120, rate: 0.011 },
    ],
    genderFactor: { female: 0.95, male: 1 },
    durationFactor: { 5: 1, 10: 0.96, 20: 0.92, 30: 0.88 },
  },

  health: {
    // annual premium per person, by coverage level
    levelBase: { basic: 45_000, standard: 95_000, premium: 180_000 },
    ageLoadingBrackets: [
      { maxAge: 17, factor: 0.8 },
      { maxAge: 39, factor: 1 },
      { maxAge: 54, factor: 1.2 },
      { maxAge: 120, factor: 1.45 },
    ],
    durationFactor: { 1: 1, 2: 1.92, 3: 2.8 },
  },

  home: {
    levelRate: { basic: 0.0035, standard: 0.0055, comprehensive: 0.0085 },
    propertyTypeFactor: {
      apartment: 1,
      detached: 1.1,
      duplex: 1.15,
      commercial: 1.3,
    },
    locationFactor: {
      lagos: 1.15,
      abuja: 1.1,
      portHarcourt: 1.12,
      otherUrban: 1,
      rural: 0.92,
    },
  },

  travel: {
    // base premium per traveller for a trip of up to 7 days
    destinationBase: {
      nigeria: 6_000,
      africa: 14_000,
      europe: 32_000,
      worldwide: 48_000,
    },
    durationFactorPerWeek: 0.55, // each extra week adds 55% of the base
    ageLoadingBrackets: [
      { maxAge: 17, factor: 0.85 },
      { maxAge: 59, factor: 1 },
      { maxAge: 70, factor: 1.35 },
      { maxAge: 120, factor: 1.75 },
    ],
    levelFactor: { basic: 1, standard: 1.3, premium: 1.7 },
  },
} as const;
