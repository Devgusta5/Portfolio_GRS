"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article";
}

export function SpotlightCard({
  children,
  className = "",
  style,
  as = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current?.style.setProperty("--spot-x", `${x}px`);
    ref.current?.style.setProperty("--spot-y", `${y}px`);
  }

  const Comp = as;

  return (
    <Comp
      ref={ref as never}
      onMouseMove={handleMouseMove}
      className={`spotlight-card group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] transition-all duration-300 hover:border-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent-glow-soft)] hover:scale-[1.02] will-change-transform ${className}`}
      style={style}
    >
      <div
        className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), var(--accent-glow-soft), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Comp>
  );
}
