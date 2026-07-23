"use client";

import { useState } from "react";
import { ETECNOTES } from "@/data/etecnotes";
import { ShinyText } from "./ShinyText";
import { ExternalLinkIcon } from "./icons/MiscIcons";
import { useLanguage } from "@/context/LanguageContext";

export function EtecNotesShowcase() {
  const { t } = useLanguage();
  const [previewLoaded, setPreviewLoaded] = useState(false);

  return (
    <section
      id="etecnotes"
      className="relative overflow-hidden px-6 py-24 sm:px-8 sm:py-32 md:py-40"
    >
      <div className="absolute inset-x-0 top-20 mx-auto h-96 max-w-5xl rounded-full bg-[var(--accent-glow)] opacity-70 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-20 lg:grid-cols-[0.95fr_auto]">
          <div>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              {t.etecnotes.label}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {t.etecnotes.title}
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-7 text-[var(--text-2)] sm:text-base sm:leading-8">
              {t.etecnotes.desc}
            </p>
            <div className="mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] px-6 py-3 text-sm font-medium text-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              +1100 {t.etecnotes.users}
            </div>
          </div>

          <div className="flex flex-wrap gap-5 sm:gap-6">
            {ETECNOTES.productSignals.map((signal) => (
              <div
                key={signal.label}
                className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-6 lg:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">
                  {signal.label}
                </p>
                <p className="mt-3 sm:mt-5 text-sm leading-6 text-[var(--text)]">
                  {signal.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 overflow-hidden rounded-2xl border border-[var(--border-2)] bg-[var(--bg-2)] shadow-xl">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card-bg)] px-8 py-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg)]/50 px-5 py-2">
              <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="font-mono text-[10px] text-[var(--text-3)]">
                etecnotes.com.br
              </span>
            </div>
          </div>
          <div className="relative h-[600px] w-full overflow-hidden bg-[var(--bg)] sm:h-[780px] lg:h-[960px]">
            {previewLoaded ? (
              <iframe
                src="https://etecnotes.com.br"
                title="EtecNotes"
                className="h-full w-full"
                style={{ border: "none" }}
                loading="lazy"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPreviewLoaded(true)}
                aria-label={t.etecnotes.loadPreview}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-7 bg-[var(--bg)]"
              >
                {/* Esqueleto sutil de dashboard so pra dar contexto visual */}
                <div className="pointer-events-none absolute inset-0 flex gap-4 p-8 opacity-[0.12] sm:p-12">
                  <div className="hidden w-40 shrink-0 flex-col gap-3 sm:flex">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-3 rounded bg-[var(--text)]" style={{ width: `${60 + ((i * 13) % 40)}%` }} />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-20 rounded-xl border border-[var(--text)]" />
                      ))}
                    </div>
                    <div className="h-full rounded-xl border border-[var(--text)]" />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 max-w-2xl rounded-full bg-[var(--accent-glow)] opacity-60 blur-[100px]" />

                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent-glow-soft)] text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)] transition-transform duration-300 group-hover:scale-110">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>

                <span className="relative inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] px-6 py-3 text-sm font-medium text-[var(--accent)]">
                  {t.etecnotes.loadPreview}
                </span>

                <span className="relative font-mono text-[10px] text-[var(--text-3)]">
                  etecnotes.com.br
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-6">
          <a
            href={ETECNOTES.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
          >
            <ExternalLinkIcon size={15} />
            <ShinyText>{t.etecnotes.live}</ShinyText>
          </a>
        </div>
      </div>
    </section>
  );
}
