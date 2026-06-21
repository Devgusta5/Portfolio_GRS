'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { THEMES } from '@/data/themes';
import { useTheme } from '@/context/ThemeContext';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  FolderKanban,
  Route,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#top', icon: LayoutDashboard },
  { label: 'Stack', href: '#stack', icon: Layers },
  { label: 'EtecNotes', href: '#etecnotes', icon: BookOpen },
  { label: 'Projetos', href: '#projetos', icon: FolderKanban },
  { label: 'Trajetoria', href: '#trajetoria', icon: Route },
];

function DockItem({
  href,
  label,
  icon: Icon,
  index,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  index: number;
  isActive?: boolean;
  onNavigate?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(Infinity);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return val - rect.x - rect.width / 2;
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.45, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.08, stiffness: 180, damping: 10 });
  const opacity = useTransform(distance, [-150, 0, 150], [0.5, 1, 0.5]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onNavigate}
      onMouseMove={(e) => { mouseX.set(e.clientX); setHovered(true); }}
      onMouseLeave={() => { mouseX.set(Infinity); setHovered(false); }}
      style={{ scale: scaleSpring, opacity }}
      className="relative flex items-center justify-center rounded-xl p-2.5 transition-colors"
    >
      {/* Active glow background */}
      {isActive && (
        <motion.span
          layoutId="nav-glow"
          className="absolute inset-0 rounded-xl border border-[var(--accent)]/35 bg-[var(--accent-glow-soft)] shadow-[0_0_18px_var(--accent-glow)]"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
      )}

      <span className={`relative ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)] group-hover:text-[var(--text-2)]'}`}>
        <Icon size={20} />
      </span>

      {/* Desktop tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--bg-2)]/95 px-2.5 py-1.5 text-xs font-medium text-[var(--text)] shadow-2xl backdrop-blur-xl md:block"
          >
            <span className="font-mono text-[10px] text-[var(--accent)]">0{index + 1}</span>{' '}
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

function ThemeDot() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center rounded-xl p-2.5 text-[var(--text-3)] transition-colors hover:text-[var(--text-2)]"
        aria-label="Trocar tema"
      >
        <span
          className="h-3.5 w-3.5 rounded-full transition-transform hover:scale-110"
          style={{ background: current.swatch, boxShadow: `0 0 12px ${current.swatch}` }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 flex gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-2)]/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`h-6 w-6 rounded-full transition-all hover:scale-125 ${
                  t.id === theme
                    ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg-2)] scale-110'
                    : ''
                }`}
                style={{ background: t.swatch }}
                aria-label={t.label}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState('#top');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.paddingBottom = '72px';
    return () => { document.body.style.paddingBottom = ''; };
  }, []);

  return (
    <>
      {/* Desktop: Floating glass sidebar */}
      <aside className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border border-[var(--border)]/80 bg-[var(--glass)] p-2.5 shadow-2xl backdrop-blur-2xl md:flex">
        {/* Liquid glass beam */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -inset-10 bg-[linear-gradient(45deg,transparent_30%,var(--accent-glow-soft)_50%,transparent_70%)] opacity-40 blur-3xl [animation:beam-drift_8s_ease-in-out_infinite]" />
        </div>

        {/* Subtle border glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-30 blur-sm [background:var(--accent)]" />

        <div className="relative flex flex-col items-center gap-1.5">
          {/* Logo */}
          <a
            href="#top"
            onClick={() => setActiveSection('#top')}
            className="mb-1 grid h-9 w-9 place-items-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-glow-soft)] text-[10px] font-bold tracking-wider text-[var(--accent)] transition-colors hover:border-[var(--accent)]/60"
          >
            GRS
          </a>

          <div className="h-px w-5 bg-[var(--border-2)]" />

          {/* Nav items */}
          {NAV_LINKS.map((link, i) => (
            <DockItem
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              index={i}
              isActive={activeSection === link.href}
            />
          ))}

          <div className="h-px w-5 bg-[var(--border-2)]" />

          {/* Theme */}
          <ThemeDot />
        </div>
      </aside>

      {/* Mobile: Floating theme button */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <ThemeDot />
      </div>

      {/* Mobile: Bottom dock */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)]/80 bg-[var(--glass)] shadow-2xl backdrop-blur-2xl md:hidden">
        <div className="absolute inset-0 border-t border-[var(--accent)]/8" />
        <div className="relative flex items-center justify-around px-2 py-1.5">
          {NAV_LINKS.map((link, i) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 transition-colors ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-xl bg-[var(--accent-glow-soft)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative">
                  <Icon size={18} />
                </span>
                <span className="relative text-[8px] font-medium leading-none">
                  {i === 0 ? link.label : link.label.slice(0, 4)}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
