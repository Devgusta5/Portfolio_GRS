import { TIMELINE } from "@/data/timeline";
import { TrophyIcon, BookIcon } from "./icons/TrophyIcon";
import { GraduationIcon } from "./icons/MiscIcons";
import type { TimelineIcon } from "@/types";

const ICONS: Record<TimelineIcon, React.ComponentType<{ size?: number }>> = {
  education: BookIcon,
  trophy: TrophyIcon,
  graduation: GraduationIcon,
};

export function Timeline() {
  return (
    <section id="trajetoria" className="px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              Trajectory log
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A linha do tempo tambem precisa parecer conquista.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-2)] md:justify-self-end">
            Educacao tecnica, hackathons e graduacao aparecem como marcos de
            evolucao, nao como curriculo estatico.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-3">
          {TIMELINE.map((entry, index) => {
            const Icon = ICONS[entry.icon];
            const isTrophy = entry.icon === "trophy";

            return (
              <article
                key={entry.title}
                className={`relative overflow-hidden rounded-2xl border p-6 ${
                  isTrophy
                    ? "border-[var(--accent)]/45 bg-[var(--accent-glow-soft)]"
                    : "border-[var(--border)] bg-[var(--card-bg)]"
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-70 [animation:beam-slide_4.4s_ease-in-out_forwards]" />
                <div className="mb-9 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-3)]">
                    checkpoint 0{index + 1}
                  </span>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                      isTrophy
                        ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] shadow-[0_0_22px_var(--accent-glow)]"
                        : "border-[var(--border-2)] bg-[var(--bg)] text-[var(--text-2)]"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                </div>

                <p className="mb-3 font-mono text-xs text-[var(--accent)]">
                  {entry.period}
                </p>
                <h3 className="mb-3 text-xl font-semibold leading-tight text-[var(--text)]">
                  {entry.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--text-2)]">
                  {entry.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
