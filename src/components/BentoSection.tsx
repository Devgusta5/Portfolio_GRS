import { SkillsCard } from "./SkillsCard";
import { GithubCard } from "./GithubCard";
import { useLanguage } from "@/context/LanguageContext";

export function BentoSection() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="px-6 py-16 sm:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 grid gap-4 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              {t.stack.label}
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t.stack.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--text-2)] md:justify-self-end">
            {t.stack.desc}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SkillsCard />
          <GithubCard />
        </div>
      </div>
    </section>
  );
}
