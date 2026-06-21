import { useEffect, useState } from "react";
import { COMMAND_DECK_LINES, IMPACT_METRICS, LAB_MODES } from "@/data/experience";

export function CommandDeck() {
  const [orbitRadius, setOrbitRadius] = useState(190);

  useEffect(() => {
    function handleResize() {
      setOrbitRadius(window.innerWidth < 640 ? 130 : 190);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px] md:max-w-[520px]">
      <div className="absolute inset-0 rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_center,var(--accent-glow-soft),transparent_58%)]" />
      <div className="absolute inset-[9%] rounded-full border border-dashed border-[var(--border-2)] [animation:slow-spin_28s_linear_infinite]" />
      <div className="absolute inset-[20%] rounded-full border border-[var(--border)] [animation:reverse-spin_34s_linear_infinite]" />

      {LAB_MODES.map((mode, index) => (
        <div
          key={mode}
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-2)] bg-[var(--bg)] text-[8px] font-semibold uppercase tracking-wide text-[var(--accent)] shadow-[0_0_24px_var(--accent-glow)] sm:h-12 sm:w-12 sm:text-[9px]"
          style={{
            transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-${orbitRadius}px) rotate(-${index * 90}deg)`,
          }}
        >
          {mode.slice(0, 3)}
        </div>
      ))}

      <div className="absolute inset-[26%] overflow-hidden rounded-[28px] border border-[var(--border-2)] bg-[color-mix(in_srgb,var(--bg)_82%,var(--accent)_18%)] shadow-2xl">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] shadow-[0_0_22px_var(--accent)] [animation:scan-line_4s_ease-in-out_infinite]" />

        <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-3)]">
                GRS.OS
              </span>
              <span className="rounded-full border border-[var(--accent)]/40 px-2 py-1 text-[10px] text-[var(--accent)]">
                online
              </span>
            </div>

            <div className="space-y-2">
              {COMMAND_DECK_LINES.map((line) => (
                <div
                  key={line.key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2"
                >
                  <span className="font-mono text-[10px] uppercase text-[var(--text-3)]">
                    {line.key}
                  </span>
                  <span className="truncate text-right text-xs text-[var(--text-2)]">
                    {line.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {IMPACT_METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 p-3 text-left"
              >
                <p className="text-lg font-semibold text-[var(--text)]">
                  {metric.value}
                </p>
                <p className="mt-1 text-[10px] leading-tight text-[var(--text-3)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
