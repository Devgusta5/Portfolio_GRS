import { SpotlightCard } from "./SpotlightCard";
import { SKILLS, CLOUD_TOOLS } from "@/data/skills";
import type { SkillCategory } from "@/types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  lang: "Core languages",
  frontend: "Interface layer",
  backend: "Service layer",
  mobile: "Touch layer",
  database: "Data layer",
};

const CATEGORIES: SkillCategory[] = ["lang", "frontend", "backend", "mobile", "database"];

export function SkillsCard() {
  return (
    <SpotlightCard className="lg:col-span-2 lg:row-span-2">
      <div className="relative h-full overflow-hidden p-5 sm:p-6">
        <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-40" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--accent)]">
              capability matrix
            </p>
            <h3 className="mt-1 text-xl font-semibold text-[var(--text)]">
              Tech Stack
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-3)]">
            {SKILLS.length + CLOUD_TOOLS.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CATEGORIES.map((cat, index) => {
            const items = SKILLS.filter((s) => s.category === cat);
            if (items.length === 0) return null;

            return (
              <div
                key={cat}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 p-2.5"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="font-mono text-[9px] text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--text-3)]">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-2 py-0.5 text-[11px] text-[var(--text-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-3">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-3)]">
            deploy / tooling rail
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CLOUD_TOOLS.map((tool) => (
              <span
                key={tool.name}
                className="rounded-full bg-[var(--bg)] px-2.5 py-0.5 text-[11px] text-[var(--text-2)]"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
