import { SkillsCard } from "./SkillsCard";
import { GithubCard } from "./GithubCard";
import { useLanguage } from "@/context/LanguageContext";

export function BentoSection() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              {t.stack.label}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.stack.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-2)] md:justify-self-end">
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
