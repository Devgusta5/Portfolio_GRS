import { SOCIAL_LINKS } from "@/data/github";
import { MagneticButton } from "./MagneticButton";
import { GithubIcon } from "./icons/GithubIcon";

export function Footer() {
  const github = SOCIAL_LINKS.find((link) => link.kind === "github");
  const email = SOCIAL_LINKS.find((link) => link.kind === "email");

  return (
    <footer className="border-t border-[var(--border)] px-6 py-14 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[28px] border border-[var(--border)] bg-[var(--card-bg)] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
              Ready to build
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Se a ideia precisa sair do papel, o portfolio ja mostrou o ritmo.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-2)]">
              Gustavo Rodrigues - Full Stack Developer focado em produto,
              performance e interfaces que ficam na memoria.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {github && (
              <MagneticButton href={github.url} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} />
                GitHub
              </MagneticButton>
            )}
            {email && (
              <MagneticButton href={email.url} variant="outline">
                Contato
              </MagneticButton>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[var(--text-3)]">
            (c) {new Date().getFullYear()} - Gustavo Rodrigues - Built with Next.js
            and Tailwind CSS
          </p>
          <div className="flex gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.kind}
                href={link.url}
                target={link.kind !== "email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-2)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
