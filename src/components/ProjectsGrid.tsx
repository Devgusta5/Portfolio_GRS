import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon } from "./icons/GithubIcon";

export function ProjectsGrid() {
  const { t } = useLanguage();
  const featured = t.projetos.items.map((item, i) => ({
    ...PROJECTS.filter((p) => p.featured)[i],
    ...item,
  }));
  const quickList = t.projetos.quick;

  return (
    <section id="projetos" className="px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-12 grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                {t.projetos.label}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.projetos.title}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-2)] md:justify-self-end">
              {t.projetos.desc}
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.name} delay={index * 80}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        {quickList.length > 0 && (
          <Reveal delay={featured.length * 80}>
            <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-colors hover:border-[var(--border-2)]">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-3)]">
                    +{quickList.length}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
                    {t.projetos.extended}
                  </p>
                </div>
                <a
                  href="https://github.com/Devgusta5?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] transition-all hover:gap-2"
                >
                  <GithubIcon size={14} />
                  {quickList.length} {t.projetos.more}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickList.map((project) => (
                  <a
                    key={project.name}
                    href={project.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/50 px-3.5 py-1.5 text-xs text-[var(--text-2)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-glow-soft)] hover:text-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]"
                  >
                    {project.name}
                    <svg className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
