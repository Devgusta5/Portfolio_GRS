import { HERO_SIGNALS } from "@/data/experience";

export function SignalMarquee() {
  const items = [...HERO_SIGNALS, ...HERO_SIGNALS];

  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--card-bg)] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div className="flex w-max gap-3 whitespace-nowrap [animation:signal-marquee_28s_linear_infinite]">
        {items.map((signal, index) => (
          <span
            key={`${signal}-${index}`}
            className="inline-flex items-center gap-3 px-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-3)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}
