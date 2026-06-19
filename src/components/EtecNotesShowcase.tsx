import { ETECNOTES } from "@/data/etecnotes";
import { CrossPlatformDisplay } from "./CrossPlatformDisplay";
import { ShinyText } from "./ShinyText";
import { ExternalLinkIcon } from "./icons/MiscIcons";
import { GithubIcon } from "./icons/GithubIcon";

export function EtecNotesShowcase() {
  return (
    <section
      id="etecnotes"
      className="relative overflow-hidden px-6 py-20 sm:px-8 md:py-28"
    >
      <div className="absolute inset-x-0 top-10 mx-auto h-72 max-w-5xl rounded-full bg-[var(--accent-glow)] opacity-70 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              Flagship / real product
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {ETECNOTES.name} vira o centro gravitacional do portfolio.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-2)] sm:text-lg">
              {ETECNOTES.description} A vitrine abaixo mostra a ideia como um
              produto vivo: dashboard, app, metricas e sinais de operacao no
              mesmo palco.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              {ETECNOTES.usersBadge}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {ETECNOTES.productSignals.map((signal) => (
              <div
                key={signal.label}
                className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-60" />
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                  {signal.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text)]">
                  {signal.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[28px] border border-[var(--border-2)] bg-[linear-gradient(135deg,var(--card-bg),transparent)] p-3 shadow-2xl md:p-5">
          <div className="relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg)]">
            <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,var(--text)_1px,transparent_0)] [background-size:28px_28px]" />
            <div className="relative grid gap-8 p-5 md:p-8 lg:grid-cols-[1fr_240px]">
              <CrossPlatformDisplay />

              <aside className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--text-3)]">
                    live feed
                  </p>
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                </div>

                <div className="space-y-3">
                  {ETECNOTES.operationFeed.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 px-3 py-3"
                    >
                      <p className="font-mono text-[10px] text-[var(--accent)]">
                        0{index + 1}
                      </p>
                      <p className="mt-1 text-xs text-[var(--text-2)]">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {ETECNOTES.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-2)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <a
            href={ETECNOTES.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          >
            <GithubIcon size={16} />
            <ShinyText>Ver repositorio</ShinyText>
          </a>
          <a
            href={ETECNOTES.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          >
            <ExternalLinkIcon size={15} />
            <ShinyText>Acessar app ao vivo</ShinyText>
          </a>
        </div>
      </div>
    </section>
  );
}

