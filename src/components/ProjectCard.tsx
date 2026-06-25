import { SpotlightCard } from "./SpotlightCard";
import { ExternalLinkIcon } from "./icons/MiscIcons";
import { GithubIcon } from "./icons/GithubIcon";
import type { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const STATUS_COLORS: Record<string, string> = {
  MVP: "bg-amber-500",
  Prototype: "bg-sky-500",
  Live: "bg-emerald-500",
  Production: "bg-emerald-500",
  Concept: "bg-violet-500",
};

const REPO_URLS: Record<string, string> = {
  "Scriptum-Library": "https://github.com/Scriptum-Hackaton/Scriptum-Library",
  "BeautyHub": "https://github.com/Otavio-Emanoel/BeautyHub",
  "Pintoo": "https://github.com/Devgusta5/Pintoo-",
};

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { t } = useLanguage();
  const dot = project.status ? STATUS_COLORS[project.status] ?? "bg-zinc-400" : null;
  const repoUrl = project.repoUrl || REPO_URLS[project.name] || "#";

  return (
    <SpotlightCard as="article" className="group flex h-full min-h-[340px] flex-col p-0">
      <div className="relative flex flex-1 flex-col overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[var(--border-2)] bg-[var(--accent-glow-soft)] blur-sm transition-all duration-500 group-hover:scale-125 group-hover:opacity-80" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--accent-glow)]" />

        <div className="mb-3 flex items-start justify-between gap-4">
          {project.angle && (
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
              {project.angle}
            </span>
          )}
          <button
            type="button"
            onClick={() => window.open(repoUrl, "_blank", "noopener")}
            aria-label={`Repositorio de ${project.name}`}
            className="ml-auto shrink-0 cursor-pointer rounded-full border border-[var(--border)] p-2 text-[var(--text-3)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-glow-soft)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]"
          >
            <GithubIcon size={16} />
          </button>
        </div>

        <h3 className="mb-2 text-xl font-semibold leading-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {project.name}
        </h3>

        <p className="mb-3 text-sm leading-6 text-[var(--text-2)]">
          {project.description}
        </p>

        {(project.signal || project.status) && (
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--text-3)]">
            {project.status && (
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                {project.status}
              </span>
            )}
            {project.signal && (
              <span className="text-[var(--text-3)]/70">{project.signal}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-2 py-0.5 text-[10px] text-[var(--text-3)] transition-colors group-hover:border-[var(--border-2)] group-hover:text-[var(--text-2)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[var(--accent)] transition-all hover:gap-2"
            >
              <ExternalLinkIcon size={12} />
              {t.projetos.view}
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
