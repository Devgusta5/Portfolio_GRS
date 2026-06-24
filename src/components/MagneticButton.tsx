"use client";

import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  target?: string;
  rel?: string;
  className?: string;
}

export function MagneticButton({
  href,
  children,
  variant = "solid",
  target,
  rel,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    ref.current?.style.setProperty("transform", `translate(${x}px, ${y}px)`);
  }

  function handleMouseLeave() {
    ref.current?.style.setProperty("transform", "translate(0, 0)");
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,background,box-shadow] duration-200 ease-out active:scale-95";
  const solid =
    "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_0_24px_var(--accent-glow)] hover:shadow-[0_0_36px_var(--accent-glow)]";
  const outline =
    "border border-[var(--border-2)] text-[var(--text)] hover:border-[var(--accent)] hover:bg-[var(--card-hover)]";

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      {children}
    </a>
  );
}
