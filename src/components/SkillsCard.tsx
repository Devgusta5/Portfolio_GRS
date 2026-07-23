import { SpotlightCard } from "./SpotlightCard";
import { SKILLS, CLOUD_TOOLS } from "@/data/skills";
import { PROJECTS } from "@/data/projects";
import { ETECNOTES } from "@/data/etecnotes";
import type { SkillCategory } from "@/types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  lang: "Core languages",
  frontend: "Interface layer",
  backend: "Service layer",
  mobile: "Touch layer",
  database: "Data layer",
};

const CATEGORIES: SkillCategory[] = ["lang", "frontend", "backend", "mobile", "database"];

/** Nomes de skill que nao batem literalmente com a tag do projeto. */
const TAG_ALIASES: Record<string, string> = {
  "Expo / React Native": "React Native",
};

const PROJECT_TAGS: { name: string; tags: string[] }[] = [
  { name: "EtecNotes", tags: ETECNOTES.tags },
  ...PROJECTS.map((p) => ({ name: p.name, tags: p.tags })),
];

function usedIn(name: string): string[] {
  const searchTerm = (TAG_ALIASES[name] ?? name).toLowerCase();
  return PROJECT_TAGS.filter((p) =>
    p.tags.some((tag) => tag.toLowerCase() === searchTerm)
  ).map((p) => p.name);
}

function SkillPill({ name, variant = "solid" }: { name: string; variant?: "solid" | "pale" }) {
  const projects = usedIn(name);
  const hasProof = projects.length > 0;

  const base =
    variant === "solid"
      ? "rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-3 py-1.5 text-sm text-[var(--text-2)] hover:text-[var(--text)]"
      : "rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-2)] hover:text-[var(--text)]";

  return (
    <span
      className={`group/pill relative inline-flex transition-colors hover:border-[var(--accent)] ${base}`}
    >
      {name}
      {hasProof && (
        <>
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)] transition-transform duration-200 group-hover/pill:scale-125" />
          <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2.5 w-max max-w-[200px] -translate-x-1/2 translate-y-1.5 scale-90 rounded-xl border border-[var(--accent)]/30 bg-[var(--bg-2)] px-3.5 py-2.5 text-left opacity-0 shadow-[0_12px_28px_-6px_var(--accent-glow)] backdrop-blur-md transition-all duration-[250ms] ease-out group-hover/pill:translate-y-0 group-hover/pill:scale-100 group-hover/pill:opacity-100">
            <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
              usado em
            </span>
            <span className="block text-xs leading-snug text-[var(--text)]">
              {projects.join(" · ")}
            </span>
            <span className="absolute left-1/2 top-full -mt-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-[var(--accent)]/30 bg-[var(--bg-2)]" />
          </span>
        </>
      )}
    </span>
  );
}

export function SkillsCard() {
  return (
    <SpotlightCard className="lg:col-span-2 lg:row-span-2">
      <div className="relative h-full overflow-hidden p-6 sm:p-7">
        <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(to_bottom,transparent,var(--accent),transparent)] opacity-40" />
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--accent)]">
              capability matrix
            </p>
            <h3 className="mt-1.5 text-2xl font-semibold text-[var(--text)]">
              Tech Stack
            </h3>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--text-3)]">
            {SKILLS.length + CLOUD_TOOLS.length} tools
          </span>
        </div>

        <div className="space-y-3">
          {CATEGORIES.map((cat, index) => {
            const items = SKILLS.filter((s) => s.category === cat);
            if (items.length === 0) return null;

            return (
              <div
                key={cat}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:flex sm:items-start sm:gap-4"
              >
                <div className="mb-2 sm:mb-0 sm:w-[140px] sm:shrink-0">
                  <p className="font-mono text-[10px] text-[var(--accent)]">
                    0{index + 1}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">
                    {CATEGORY_LABELS[cat]}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <SkillPill key={skill.name} name={skill.name} />
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
              <SkillPill key={tool.name} name={tool.name} variant="pale" />
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
