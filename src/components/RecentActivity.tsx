"use client";

import { useEffect, useState } from "react";
import type { CommitActivity } from "@/app/api/github/route";
import { useLanguage } from "@/context/LanguageContext";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "agora mesmo";
  if (hours < 24) return `ha ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `ha ${days}d`;
  return `ha ${Math.floor(days / 30)}mes`;
}

function RepoIcon({ size }: { size?: number }) {
  const s = size ?? 14;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function RecentActivity() {
  const { t } = useLanguage();
  const [commits, setCommits] = useState<CommitActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: CommitActivity[]) => {
        setCommits(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-3)]">
          {t.recent.title}
        </p>
        <span className="relative flex h-1.5 w-1.5">
          {loading && (
            <span className="absolute inline-flex h-full w-full animate-beta-pulse rounded-full bg-[var(--accent)] opacity-75" />
          )}
          {!loading && !error && (
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          )}
          {error && (
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
          )}
        </span>
      </div>

      {loading && (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg bg-[var(--card-hover)] p-2"
            >
              <div className="mb-1.5 h-2.5 w-2/3 rounded bg-[var(--border)]" />
              <div className="h-2 w-1/3 rounded bg-[var(--border)]" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="py-4 text-center text-[10px] text-[var(--text-3)]">
          {t.recent.error}
        </p>
      )}

      {!loading && !error && commits.length === 0 && (
        <p className="py-4 text-center text-[10px] text-[var(--text-3)]">
          {t.recent.empty}
        </p>
      )}

      {!loading && !error && commits.length > 0 && (
        <div className="space-y-1.5">
          {commits.slice(0, 3).map((commit, i) => (
            <a
              key={`${commit.repo}-${commit.date}-${i}`}
              href={commit.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-[var(--border)] bg-[var(--bg)]/50 p-2 transition-colors hover:border-[var(--border-2)]"
            >
              <div className="flex items-center gap-1.5">
                <span className="shrink-0 text-[var(--accent)]">
                  <RepoIcon size={12} />
                </span>
                <p className="truncate text-[11px] font-medium text-[var(--text)]">
                  {commit.repo.split("/")[1]}
                </p>
                <span className="ml-auto shrink-0 font-mono text-[9px] text-[var(--text-3)]">
                  {timeAgo(commit.date)}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[10px] text-[var(--text-2)]">
                {commit.message}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
