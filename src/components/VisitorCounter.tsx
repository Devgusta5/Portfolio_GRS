"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface VisitorsResponse {
  unique: number | null;
  total: number | null;
}

export function VisitorCounter() {
  const { t } = useLanguage();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => (res.ok ? (res.json() as Promise<VisitorsResponse>) : null))
      .then((data) => {
        if (data?.unique != null) setCount(data.unique);
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-3)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {count.toLocaleString()} {t.footer.visitors}
    </div>
  );
}
