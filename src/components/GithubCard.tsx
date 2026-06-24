import { SpotlightCard } from "./SpotlightCard";
import { GithubIcon } from "./icons/GithubIcon";
import { StarIcon } from "./icons/MiscIcons";
import { REPOS, GITHUB_USERNAME } from "@/data/github";
import { RecentActivity } from "./RecentActivity";

export function GithubCard() {
  return (
    <SpotlightCard className="lg:col-span-1 lg:row-span-2">
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-contrast)] shadow-[0_0_28px_var(--accent-glow)]">
            <GithubIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">
              {GITHUB_USERNAME}
            </p>
            <p className="text-xs text-[var(--text-3)]">open-source telemetry</p>
          </div>
        </div>

        <RecentActivity />

        <ul className="mt-4 flex-1 space-y-2.5">
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
