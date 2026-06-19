import { ThemeSwitcher } from "./ThemeSwitcher";

const NAV_LINKS = [
  { label: "Stack", href: "#stack" },
  { label: "EtecNotes", href: "#etecnotes" },
  { label: "Projetos", href: "#projetos" },
  { label: "Trajetoria", href: "#trajetoria" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[var(--border)]">
      <nav className="glass-nav flex items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-3 font-mono text-sm font-semibold tracking-tight text-[var(--text)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
            G
          </span>
          <span className="hidden sm:inline">
            gustavo<span className="text-[var(--accent)]">.</span>rodrigues
          </span>
        </a>

        <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-2 py-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--text-2)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--text)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-[var(--border)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)] lg:inline-flex">
            portfolio system
          </span>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
