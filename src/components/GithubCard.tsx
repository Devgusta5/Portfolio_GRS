"use client";

import { useEffect, useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { GithubIcon } from "./icons/GithubIcon";
import { StarIcon } from "./icons/MiscIcons";
import { REPOS, GITHUB_USERNAME } from "@/data/github";
import type { RepoSummary } from "@/app/api/github/repos/route";
import { RecentActivity } from "./RecentActivity";
import { useLanguage } from "@/context/LanguageContext";

// Fallback exibido enquanto a API carrega ou se ela falhar (dados honestos).
const FALLBACK: RepoSummary[] = REPOS.map((r) => ({
  name: r.name,
  description: r.description,
  stars: r.stars,
  language: null,
  url: `https://github.com/${GITHUB_USERNAME}/${r.name}`,
}));

export function GithubCard() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<RepoSummary[]>(FALLBACK);

  useEffect(() => {
    let active = true;
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data: RepoSummary[]) => {
        if (active && Array.isArray(data) && data.length > 0) setRepos(data);
      })
      .catch(() => {
        /* mantem o fallback estatico */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <SpotlightCard className="lg:col-span-1 lg:row-span-2">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_0_20px_var(--accent-glow)]">
            <GithubIcon size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              {GITHUB_USERNAME}
            </p>
            <p className="text-[10px] text-[var(--text-3)]">{t.github.label}</p>
          </div>
        </div>

        <RecentActivity />

        <ul className="mt-3 flex-1 space-y-2">
          {repos.slice(0, 3).map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 p-2.5 transition-colors hover:border-[var(--border-2)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-medium text-[var(--text)]">
                    {repo.name}
                  </p>
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-[var(--text-3)]">
                    {repo.stars > 0 ? (
                      <>
                        <StarIcon size={10} />
                        {repo.stars}
                      </>
                    ) : (
                      repo.language
                    )}
                  </span>
                </div>
                {repo.description && (
                  <p className="mt-0.5 truncate text-[11px] text-[var(--text-2)]">
                    {repo.description}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-between rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[11px] font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]"
        >
          {t.github.explore}
          <span aria-hidden="true" className="ml-1">-&gt;</span>
        </a>
      </div>
    </SpotlightCard>
  );
}
