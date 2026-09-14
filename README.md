# Quick Quote

Build a lightweight, modern, responsive Insurance Premium Calculator Demo for an insurance company.

OBJECTIVE

Create a polished proof-of-concept that demonstrates how a customer can select an insurance product, enter a few relevant details, and instantly receive an estimated insurance premium.

This is ONLY a demo/MVP for presentation purposes.

Do NOT build authentication, payments, CRM, claims management, customer accounts, complex backend infrastructure, or production actuarial calculations.

The priority is an excellent UI/UX and working premium calculation flow.

1. LANDING / CALCULATOR SCREEN

Create a clean, premium-looking insurance interface.

Header:

Insurance company logo placeholder

Company name: "ABC Insurance"

Simple navigation: Home | Products | Contact

Hero section:

Calculate Your Insurance Premium

"Get an instant estimate based on your selected insurance product and coverage."

Then display the calculator prominently.

2. STEP 1 — SELECT INSURANCE TYPE

The first question should be:

What would you like to insure?

Display attractive selectable cards for:

🚗 Motor Insurance

Protect your vehicle against accidents, theft and other covered risks.

❤️ Life Insurance

Financial protection for you and your loved ones.

🏥 Health Insurance

Cover eligible healthcare expenses and medical services.

🏠 Home Insurance

Protect your home and personal property against covered risks.

✈️ Travel Insurance

Protection while travelling locally or internationally.

Make the cards interactive.

When the user selects one, move to the relevant calculator fields.

3. PRODUCT-SPECIFIC INPUTS

The fields should change depending on the selected insurance type.

MOTOR INSURANCE

Show:

Vehicle Value

Vehicle Type

Saloon

SUV

Pickup

Bus

Truck

Vehicle Age

Coverage

Third Party

Comprehensive

Optional Add-ons

Theft Protection

Flood Protection

Windscreen Protection

Personal Accident Cover

LIFE INSURANCE

Show:

Age

Gender

Coverage Amount

Policy Duration

5 years

10 years

20 years

30 years

HEALTH INSURANCE

Show:

Age

Number of People to Cover

Coverage Level

Basic

Standard

Premium

Policy Duration

HOME INSURANCE

Show:

Property Value

Property Type

Apartment

Detached House

Duplex

Commercial Property

Location

Coverage Level

Basic

Standard

Comprehensive

TRAVEL INSURANCE

Show:

Destination

Nigeria

Africa

Europe

Worldwide

Traveller Age

Trip Duration

Number of Travellers

Coverage Level

Basic

Standard

Premium

4. CALCULATION

Use simple demo pricing formulas.

Clearly label the result as:

Estimated Premium

and include a small disclaimer:

"Premium shown is an illustrative estimate for demonstration purposes and may differ from the final quotation."

Use Nigerian Naira formatting:

₦

The exact rates should be stored in a clearly separated JavaScript configuration object so they can easily be changed later.

Example:

Motor:

Comprehensive = approximately 3% of vehicle value

Third Party = fixed demo premium

Life:

Base rate determined by age

Multiply by selected coverage amount and policy duration

Health:

Base premium based on coverage level

Multiply by number of people

Home:

Percentage of property value based on coverage level

Travel:

Base premium based on destination

Adjust according to duration, age and number of travellers

These are demo rates only.

Do not present them as actual insurance industry rates.

5. RESULTS SCREEN

After clicking:

Calculate Premium

show a polished results panel.

Example:

Your Estimated Premium

₦185,000

Payment option:

Annual Premium

Then show:

Coverage Summary

Insurance Type: Motor Insurance

Vehicle Value: ₦6,000,000

Coverage: Comprehensive

Policy Duration: 1 Year

Premium Breakdown

Base Premium

Coverage adjustment

Add-ons

Estimated total

Add buttons:

Get a Quote

Start Again

The "Get a Quote" button can simply display a small demo message/modal saying:

"Thank you. A representative will contact you to complete your quotation."

Do not build a real submission backend yet.

6. USER EXPERIENCE

Make the calculator feel like a modern fintech/insurtech product.

Use:

Large typography

Generous spacing

Clean cards

Subtle shadows

Rounded corners

Professional insurance aesthetic

Responsive mobile-first design

Smooth transitions between steps

Progress indicator:

Step 1 — Insurance Type
Step 2 — Details
Step 3 — Estimate

Include:

← Back

and

Continue →

buttons where appropriate.

Disable Continue until the required fields are completed.

Validate numerical fields and prevent negative values.

Format currency fields with Nigerian Naira formatting.

7. TECHNICAL REQUIREMENTS

Use:

React

Vite

Tailwind CSS

Lucide icons

Keep the application lightweight.

For this demo:

No authentication

No database

No Supabase

No payment gateway

No external APIs

No backend

No unnecessary dependencies

Keep all demo pricing rules in one easily editable configuration file/object.

Structure the application cleanly so that a backend and real pricing engine can be added later.

Suggested structure:

src/
components/
InsuranceSelector
CalculatorForm
ProgressIndicator
PremiumResult
Header
data/
insuranceProducts.js
pricingRules.js
pages/
Calculator.jsx
App.jsx

8. IMPORTANT FUTURE-READY DESIGN

Although this is only a demo, architect the calculation logic so that the UI does not contain hard-coded calculations everywhere.

Create a reusable function such as:

calculatePremium(insuranceType, formData)

which returns:

{
basePremium,
adjustments,
addOns,
totalPremium
}

This will make it easy to replace the demo calculation engine with the insurance company's actual pricing/rating engine later.

9. DEMO QUALITY

The finished application should look like something that can immediately be shown to the insurance company's management team.

Do not make it look like a generic developer template.

Create a convincing insurance quotation experience with excellent spacing, typography, responsive behavior and polished interactions.

Use realistic placeholder branding:

ABC Insurance

and a professional tagline:

Protection made simple.

Make the calculator the central focus of the experience.

Ensure the entire flow works from:

Select Insurance → Enter Details → Calculate → View Premium → Start Again

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c92e8a81-55a6-4185-a909-d1954289de0a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
