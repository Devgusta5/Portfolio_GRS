import { ETECNOTES } from "@/data/etecnotes";

export function PhoneMockup() {
  return (
    <div className="w-[200px] sm:w-[230px]">
      <div className="rounded-[2rem] border-[6px] border-[var(--bg-3)] bg-[var(--bg-3)] p-1.5 shadow-2xl">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg)]">
          <div className="absolute left-1/2 top-1.5 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[var(--bg-3)]" />

          <div className="flex h-[400px] flex-col pt-7 sm:h-[460px]">
            <div className="px-4 pb-3">
              <p className="text-[10px] text-[var(--text-3)]">Bem-vindo de volta</p>
              <p className="text-sm font-semibold text-[var(--text)]">
                Painel do Aluno
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 px-4">
              {ETECNOTES.mobileStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-2.5"
                >
                  <p className="text-base font-semibold text-[var(--accent)]">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-[var(--text-3)]">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex-1 space-y-2 overflow-hidden px-4">
              {["Matematica", "Programacao Web", "Banco de Dados"].map(
                (subject, i) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2.5"
                  >
                    <span className="text-[11px] text-[var(--text-2)]">
                      {subject}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--accent)]">
                      {[9.2, 8.5, 9.8][i]}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center justify-around border-t border-[var(--border)] py-3">
              {["Inicio", "Notas", "Avisos", "Perfil"].map((tab, i) => (
                <span
                  key={tab}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === 0 ? "bg-[var(--accent)]" : "bg-[var(--text-3)]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
