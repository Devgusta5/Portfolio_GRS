import { TrophyIcon, BookIcon } from "./icons/TrophyIcon";
import { GraduationIcon, BriefcaseIcon, CodeIcon } from "./icons/MiscIcons";
import { Reveal } from "./Reveal";
import type { TimelineIcon } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const TYPE_ORDER: TimelineIcon[] = ["education", "work", "work", "graduation"];

const ICONS: Record<TimelineIcon, React.ComponentType<{ size?: number }>> = {
  education: BookIcon,
  trophy: TrophyIcon,
  graduation: GraduationIcon,
  work: BriefcaseIcon,
  build: CodeIcon,
};

const TYPE_STYLES: Record<TimelineIcon, { border: string; bg: string; icon: string }> = {
  education: {
    border: "border-[var(--border-2)]",
    bg: "bg-[var(--card-bg)]",
    icon: "border-[var(--border-2)] bg-[var(--bg)] text-[var(--text-2)]",
  },
  trophy: {
    border: "border-[var(--accent)]/45",
    bg: "bg-[var(--accent-glow-soft)]",
    icon: "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] shadow-[0_0_22px_var(--accent-glow)]",
  },
  graduation: {
    border: "border-[var(--border-2)]",
    bg: "bg-[var(--card-bg)]",
    icon: "border-[var(--border-2)] bg-[var(--bg)] text-[var(--text-2)]",
  },
  work: {
    border: "border-[var(--accent)]/30",
    bg: "bg-[var(--accent-glow-soft)]/40",
    icon: "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--accent)] shadow-[0_0_22px_var(--accent-glow)]",
  },
  build: {
    border: "border-[var(--border-2)]",
    bg: "bg-[var(--card-bg)]",
    icon: "border-[var(--border-2)] bg-[var(--bg)] text-[var(--text-2)]",
  },
};

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="trajetoria" className="px-6 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <header className="mb-14 grid gap-5 md:grid-cols-[0.8fr_1fr] md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
                {t.timeline.label}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.timeline.title}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--text-2)] md:justify-self-end">
              {t.timeline.desc}
            </p>
          </header>
        </Reveal>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-2)] to-transparent sm:block lg:left-1/2 lg:-translate-x-px" />

          <div className="relative space-y-8 lg:space-y-12">
            {t.timeline.entries.map((entry, index) => {
              const iconType = TYPE_ORDER[index];
              const Icon = ICONS[iconType];
              const styles = TYPE_STYLES[iconType];
              const isLeft = index % 2 === 0;

              return (
                <Reveal key={entry.title} delay={index * 120}>
                  <div className={`relative flex flex-col gap-4 lg:flex-row lg:items-start ${isLeft ? "" : "lg:flex-row-reverse"}`}>
                    {/* Dot marker */}
                    <div className="absolute left-[15px] top-[18px] z-10 hidden h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_8px_var(--accent-glow)] sm:block lg:left-1/2 lg:-translate-x-1/2" />

                    {/* Spacer for line on large screens */}
                    <div className="hidden lg:block lg:w-1/2" />

                    {/* Card */}
                    <div className={`relative w-full sm:pl-12 lg:w-1/2 ${isLeft ? "lg:pr-10" : "lg:pl-10"}`}>
                      <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_24px_var(--accent-glow)] ${styles.border} ${styles.bg}`}>
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60" />

                        <div className="mb-5 flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                            checkpoint 0{index + 1}
                          </span>
                          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:shadow-[0_0_30px_var(--accent-glow)] ${styles.icon}`}>
                            <Icon size={17} />
                          </span>
                        </div>

                        <div className="mb-3 inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                          {entry.period}
                        </div>

                        <h3 className="mb-3 text-xl font-semibold leading-tight text-[var(--text)]">
                          {entry.title}
                        </h3>
                        <p className="text-sm leading-7 text-[var(--text-2)]">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
