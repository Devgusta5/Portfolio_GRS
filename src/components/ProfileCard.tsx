import { SpotlightCard } from "./SpotlightCard";
import { LayersIcon } from "./icons/MiscIcons";

const HIGHLIGHTS = [
  { label: "Foco", value: "Full Stack & Mobile" },
  { label: "Hackathons", value: "2x Vencedor" },
  { label: "Formacao", value: "ADS - UNISANTA" },
];

const PRINCIPLES = ["performance first", "clean flows", "real problems"];

export function ProfileCard() {
  return (
    <SpotlightCard className="lg:col-span-1">
      <div className="p-6 sm:p-7">
        <div className="mb-5 flex items-center gap-2 text-[var(--accent)]">
          <LayersIcon size={14} />
          <span className="font-mono text-[11px] uppercase tracking-[0.24em]">
            Operator profile
          </span>
        </div>

        <div className="space-y-3.5">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0"
            >
              <span className="text-xs text-[var(--text-3)]">{item.label}</span>
              <span className="text-right text-sm font-medium text-[var(--text)]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-2">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 px-3 py-2 text-xs text-[var(--text-2)]"
            >
              {principle}
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
