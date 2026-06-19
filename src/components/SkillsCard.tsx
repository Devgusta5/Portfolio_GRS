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
      <div className="relative h-full overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-40" />
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--accent)]">
              capability matrix
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">
              Tech Stack
            </h3>
          </div>
          <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-3)]">
            {SKILLS.length + CLOUD_TOOLS.length} tools
          </span>
        </div>

        <div className="space-y-4">
          {CATEGORIES.map((cat, index) => {
            const items = SKILLS.filter((s) => s.category === cat);
            if (items.length === 0) return null;

            return (
              <div
                key={cat}
                className="grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/50 p-3 sm:grid-cols-[140px_1fr]"
              >
                <div>
                  <p className="font-mono text-[10px] text-[var(--accent)]">
                    0{index + 1}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">
                    {CATEGORY_LABELS[cat]}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-2.5 py-1 text-xs text-[var(--text-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
            deploy / tooling rail
          </p>
          <div className="flex flex-wrap gap-2">
            {CLOUD_TOOLS.map((tool) => (
              <span
                key={tool.name}
                className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-2)]"
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
