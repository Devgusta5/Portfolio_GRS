import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid() {
  const featured = PROJECTS.filter((p) => p.featured);
  const quickList = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projetos" className="px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              Side quests / product labs
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Projetos secundarios com cara de experimento serio.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-2)] md:justify-self-end">
            Cada projeto ganha contexto de produto: qual problema toca, qual
            fluxo principal resolve e quais tecnologias sustentam a experiencia.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {quickList.length > 0 && (
          <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
                extended repository field
              </p>
              <span className="text-xs text-[var(--accent)]">
                {quickList.length} more builds
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {quickList.map((project) => (
                <a
                  key={project.name}
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-2)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  {project.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
