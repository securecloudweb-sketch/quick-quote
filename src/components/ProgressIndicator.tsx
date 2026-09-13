const steps = ["Insurance Type", "Details", "Estimate"];

export function ProgressIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-2" aria-label="Progress">
      {steps.map((label, i) => {
        const index = i + 1;
        const active = index === current;
        const done = index < current;
        return (
          <div key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <div
              className={[
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 eyebrow transition-colors",
                active
                  ? "bg-foreground text-primary-foreground"
                  : done
                    ? "text-primary"
                    : "text-muted-foreground",
                i === 2 ? "" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "size-1.5 rounded-full",
                  active
                    ? "bg-primary-foreground"
                    : done
                      ? "bg-primary"
                      : "bg-muted-foreground/40",
                ].join(" ")}
              />
              <span className="hidden sm:inline">
                0{index} {label}
              </span>
              <span className="sm:hidden">0{index}</span>
            </div>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}
