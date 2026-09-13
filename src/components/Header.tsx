import { ShieldCheck } from "lucide-react";

const links = ["Home", "Products", "Contact"];

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-foreground text-primary-foreground ring-1 ring-border">
          <ShieldCheck className="size-4" aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold tracking-tight">ABC Insurance</p>
          <p className="text-[11px] text-muted-foreground">Protection made simple.</p>
        </div>
      </div>
      <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
        {links.map((link, i) => (
          <a
            key={link}
            href="#"
            className={
              i === 0
                ? "font-medium text-foreground"
                : "transition-colors hover:text-foreground"
            }
          >
            {link}
          </a>
        ))}
      </nav>
      <span className="eyebrow text-muted-foreground sm:hidden">ABC</span>
    </header>
  );
}
