import { ETECNOTES } from "@/data/etecnotes";

export function LaptopMockup() {
  return (
    <div className="w-full max-w-[640px]">
      <div className="rounded-t-xl border border-[var(--border-2)] bg-[var(--bg-3)] p-2 shadow-2xl">
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg)]">
          <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--bg-2)] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-3 truncate text-[10px] text-[var(--text-3)]">
              app.etecnotes.com/dashboard
            </span>
          </div>

          <div className="flex h-[300px] sm:h-[340px]">
            <aside className="hidden w-32 shrink-0 flex-col gap-1 border-r border-[var(--border)] bg-[var(--bg-2)] p-3 sm:flex">
              <div className="mb-3 h-2 w-16 rounded-full bg-[var(--accent)]" />
              {["Dashboard", "Turmas", "Notas", "Avisos", "Perfil"].map(
                (item, i) => (
                  <div
                    key={item}
                    className={`rounded-md px-2 py-1.5 text-[10px] ${
                      i === 0
                        ? "bg-[var(--accent-glow-soft)] text-[var(--accent)]"
                        : "text-[var(--text-3)]"
                    }`}
                  >
                    {item}
                  </div>
                )
              )}
            </aside>

            <main className="flex-1 overflow-hidden p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-2.5 w-24 rounded-full bg-[var(--text-2)]/40" />
                <div className="h-6 w-6 rounded-full bg-[var(--accent-glow)]" />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {ETECNOTES.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-2.5"
                  >
                    <p className="text-base font-semibold text-[var(--accent)] sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-[var(--text-3)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-2">
                {[80, 55, 95].map((width, i) => (
                  <div
                    key={i}
                    className="h-7 rounded-lg border border-[var(--border)] bg-[var(--card-bg)]"
                  >
                    <div
                      className="h-full rounded-lg bg-[var(--accent-glow)]"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      <div className="relative h-3 rounded-b-2xl bg-[var(--bg-3)] shadow-lg">
        <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-md bg-[var(--border-2)]" />
      </div>
    </div>
  );
}
