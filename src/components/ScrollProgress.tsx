"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function update() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const value = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.min(1, Math.max(0, value)));
        raf = 0;
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[70] h-px w-full bg-[var(--border)]">
      <div
        className="h-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
