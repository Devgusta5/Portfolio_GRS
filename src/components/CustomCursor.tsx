"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role=button], input, select, textarea, label";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (mq.matches || isTouch) return;

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = `*{cursor:none!important}`;
    document.head.appendChild(style);

    let raf: number;
    let visible = false;

    function loop() {
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const px = pos.current.x;
      const py = pos.current.y;

      pos.current.x += (mx - px) * 0.35;
      pos.current.y += (my - py) * 0.35;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest(INTERACTIVE);
      if (isInteractive && !hovering.current) {
        hovering.current = true;
        if (ringRef.current) {
          ringRef.current.style.width = "36px";
          ringRef.current.style.height = "36px";
          ringRef.current.style.boxShadow = "0 0 20px var(--accent-glow), 0 0 60px var(--accent-glow)";
        }
      } else if (!isInteractive && hovering.current) {
        hovering.current = false;
        if (ringRef.current) {
          ringRef.current.style.width = "24px";
          ringRef.current.style.height = "24px";
          ringRef.current.style.boxShadow = "0 0 12px var(--accent-glow)";
        }
      }
    }

    function onLeave() {
      visible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border sm:block"
        style={{
          width: 24,
          height: 24,
          borderColor: "var(--accent)",
          boxShadow: "0 0 12px var(--accent-glow)",
          opacity: 0,
          transition: "width 0.12s ease, height 0.12s ease, box-shadow 0.12s ease, opacity 0.15s ease",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full sm:block"
        style={{
          width: 4,
          height: 4,
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 8px var(--accent-glow)",
          opacity: 0,
          transition: "opacity 0.15s ease",
        }}
      />
    </>
  );
}
