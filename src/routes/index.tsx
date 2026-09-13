import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "@/pages/Calculator";

const title = "ABC Insurance — Instant Premium Calculator";
const description =
  "Estimate your motor, life, health, home or travel insurance premium in seconds with the ABC Insurance calculator.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Calculator,
});
