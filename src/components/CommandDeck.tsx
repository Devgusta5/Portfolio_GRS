"use client";

import { motion } from "framer-motion";
import { COMMAND_DECK_LINES, IMPACT_METRICS, LAB_MODES } from "@/data/experience";

export function CommandDeck() {
  return (
    <div 
      // Definimos o raio da órbita puramente via CSS de forma responsiva. 
      // Zero JavaScript, zero quebra de hidratação no Next.js!
      className="[--orbit-radius:130px] sm:[--orbit-radius:190px] relative mx-auto aspect-square w-full max-w-[480px] md:max-w-[520px]"
    >
      {/* Brilho de Fundo e Linhas de Órbita */}
      <div className="absolute inset-0 rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_center,var(--accent-glow-soft),transparent_58%)]" />
      
      {/* Órbitas Animadas com Framer Motion (Aceleração por Hardware) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        className="absolute inset-[9%] rounded-full border border-dashed border-[var(--border-2)]"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 34, ease: "linear" }}
        className="absolute inset-[20%] rounded-full border border-[var(--border)]"
      />

      {/* Nós Orbitais Interativos */}
      {LAB_MODES.map((mode, index) => {
        const angle = index * 90;
        return (
          <motion.div
            key={mode}
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--border-2)] bg-[var(--bg)] text-[8px] font-semibold uppercase tracking-wide text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow-soft)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--text)] sm:h-12 sm:w-12 sm:text-[9px]"
            style={{
              // Usando a variável CSS responsiva direto no cálculo de translação
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * var(--orbit-radius))) rotate(-${angle}deg)`,
            }}
            whileHover={{ 
              scale: 1.15, 
              boxShadow: "0 0 25px var(--accent-glow)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {mode.slice(0, 3)}
          </motion.div>
        );
      })}

      {/* Central Deck (Painel de Controle) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-[26%] overflow-hidden rounded-[28px] border border-[var(--border-2)] bg-[color-mix(in_srgb,var(--bg)_85%,var(--accent)_15%)] shadow-2xl backdrop-blur-sm"
      >
        {/* Grid Técnico de Fundo */}
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Linha de Scanner Avançada */}
        <motion.div 
          animate={{ translateY: ["0%", "1000%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" }}
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70 shadow-[0_0_12px_var(--accent)]"
        />

        <div className="relative flex h-full flex-col justify-between p-4 sm:p-6">
          {/* Header do Deck */}
          <div>
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-3)] sm:text-[10px]">
                GRS.OS // LAB
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] uppercase text-emerald-400 sm:text-[10px]">
                  online
                </span>
              </div>
            </div>

            {/* Linhas de Comando */}
            <div className="space-y-1.5 sm:space-y-2">
              {COMMAND_DECK_LINES.map((line) => (
                <motion.div
                  key={line.key}
                  whileHover={{ x: 4, borderLeftColor: "var(--accent)" }}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)]/80 px-2.5 py-1.5 transition-all sm:px-3 sm:py-2"
                >
                  <span className="font-mono text-[9px] uppercase text-[var(--text-3)] sm:text-[10px]">
                    {line.key}
                  </span>
                  <span className="truncate text-right text-xs font-medium text-[var(--text-2)]">
                    {line.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Métricas de Impacto */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {IMPACT_METRICS.map((metric) => (
              <motion.div
                key={metric.label}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 p-2 text-left sm:p-3"
              >
                <p className="text-base font-bold tracking-tight text-[var(--text)] sm:text-lg">
                  {metric.value}
                </p>
                <p className="mt-0.5 text-[8px] leading-tight text-[var(--text-3)] sm:text-[10px]">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}