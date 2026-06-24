import { SpotlightCard } from "./SpotlightCard";
import { ExternalLinkIcon } from "./icons/MiscIcons";
import { GithubIcon } from "./icons/GithubIcon";
import type { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const { t } = useLanguage();
  return (
    <SpotlightCard as="article" className="flex h-full min-h-[320px] flex-col p-0">
      <div className="relative flex flex-1 flex-col overflow-hidden p-6">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-[var(--border-2)] bg-[var(--accent-glow-soft)] blur-sm" />
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-60" />

        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)]">
              experiment 0{index + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-tight text-[var(--text)]">
              {project.name}
            </h3>
          </div>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositorio de ${project.name}`}
            className="rounded-full border border-[var(--border)] p-2 text-[var(--text-3)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <GithubIcon size={16} />
          </a>
        </div>

        <div className="mb-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">
            {project.angle}
          </p>
          <p className="mt-2 text-xs text-[var(--accent)]">{project.signal}</p>
        </div>

        <p className="mb-5 flex-1 text-sm leading-7 text-[var(--text-2)]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-3)]"
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
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)]"
          >
            <ExternalLinkIcon size={12} />
            {t.projetos.view}
          </a>
        )}
      </div>
    </SpotlightCard>
  );
}

