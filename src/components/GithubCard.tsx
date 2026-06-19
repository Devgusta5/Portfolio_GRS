import { SpotlightCard } from "./SpotlightCard";
import { GithubIcon } from "./icons/GithubIcon";
import { StarIcon } from "./icons/MiscIcons";
import { REPOS, GITHUB_USERNAME } from "@/data/github";

const ACTIVITY = [28, 52, 34, 76, 48, 88, 62, 40, 70, 96, 58, 82];

export function GithubCard() {
  return (
    <SpotlightCard className="lg:col-span-1 lg:row-span-2">
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-black shadow-[0_0_28px_var(--accent-glow)]">
            <GithubIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              {GITHUB_USERNAME}
            </p>
            <p className="text-xs text-[var(--text-3)]">open-source telemetry</p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-3)]">
              commit pulse
            </p>
            <span className="text-xs text-[var(--accent)]">active</span>
          </div>
          <div className="flex h-24 items-end gap-1.5">
            {ACTIVITY.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="flex-1 rounded-t bg-[var(--accent)]/70 shadow-[0_0_12px_var(--accent-glow)]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <ul className="flex-1 space-y-2.5">
          {REPOS.map((repo) => (
            <li
              key={repo.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 p-3 transition-colors hover:border-[var(--border-2)]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-[var(--text)]">
                  {repo.name}
                </p>
                <span className="flex items-center gap-1 text-xs text-[var(--text-3)]">
                  <StarIcon size={11} />
                  {repo.stars}
                </span>
              </div>
              <p className="mt-1 truncate text-xs text-[var(--text-2)]">
                {repo.description}
              </p>
            </li>
          ))}
        </ul>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-between rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]"
        >
          Explorar ecossistema
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </SpotlightCard>
  );
}
