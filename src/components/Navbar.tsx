'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { THEMES } from '@/data/themes';
import { useTheme } from '@/context/ThemeContext';
import {
  Home,
  Layers,
  BookOpen,
  FolderKanban,
  Route,
  Radar,
  MessageCircle,
} from 'lucide-react';

function GithubIcon({ size, fill: _f }: { size?: number; fill?: string }) {
  const s = size ?? 18;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ size, fill: _f }: { size?: number; fill?: string }) {
  const s = size ?? 18;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedinIcon({ size, fill: _f }: { size?: number; fill?: string }) {
  const s = size ?? 18;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ size, fill: _f }: { size?: number; fill?: string }) {
  const s = size ?? 18;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={s} height={s}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Inicio', href: '#top', icon: Home },
  { label: 'Skills', href: '#capability-matrix', icon: Radar },
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

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.3, 1]);
  const scaleSpring = useSpring(scale, { mass: 0.08, stiffness: 200, damping: 12 });
  const opacity = useTransform(distance, [-150, 0, 150], [0.65, 1, 0.65]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onNavigate}
      onMouseMove={(e) => { mouseX.set(e.clientX); setHovered(true); }}
      onMouseLeave={() => { mouseX.set(Infinity); setHovered(false); }}
      style={{ scale: scaleSpring, opacity }}
      className="relative flex items-center justify-center rounded-xl p-2.5 transition-colors group cursor-pointer"
    >
      {/* Active glow background & Laser indicator tick */}
      {isActive && (
        <>
          <motion.span
            layoutId="nav-glow"
            className="absolute inset-0 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent-glow-soft)]"
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />
          <motion.span
            layoutId="active-tick"
            className="absolute -left-1.5 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />
        </>
      )}

      <span className={`relative transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)] group-hover:text-[var(--text-2)]'}`}>
        <Icon size={18} />
      </span>

      {/* Desktop tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg border border-[var(--border-2)] bg-[var(--bg-2)]/90 px-2.5 py-1.5 text-[10px] font-mono text-[var(--text)] shadow-2xl backdrop-blur-xl md:block"
          >
            <span className="text-[var(--accent)]">0{index + 1}</span>{' '}
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

function SocialPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const links = [
    { icon: MailIcon, href: 'mailto:gustaaffonso@gmail.com', label: 'Gmail' },
    { icon: InstagramIcon, href: 'https://instagram.com/gust4.afonso', label: 'Instagram' },
    { icon: LinkedinIcon, href: 'https://linkedin.com/in/gustavo-rodrigues-6856482a0', label: 'LinkedIn' },
    { icon: GithubIcon, href: 'https://github.com/anomalyco', label: 'GitHub' },
  ];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="relative flex items-center justify-center rounded-xl border border-[var(--border-2)] p-2.5 text-[var(--text-3)] transition-colors hover:border-[var(--text-3)] hover:text-[var(--text-2)]"
        aria-label="Contato"
      >
        <MessageCircle size={18} fill="currentColor" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 flex gap-1.5 rounded-xl border border-[var(--border-2)] bg-[var(--bg-2)]/90 p-2 shadow-2xl backdrop-blur-xl"
          >
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center rounded-lg p-2 text-[var(--text-3)] transition-colors hover:text-[var(--accent)] hover:bg-[var(--card-hover)]"
                  aria-label={link.label}
                >
                  <Icon size={16} fill="currentColor" />
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        className="relative flex items-center justify-center rounded-xl border border-[var(--border-2)] p-2.5 text-[var(--text-3)] transition-colors hover:border-[var(--text-3)] hover:text-[var(--text-2)]"
        aria-label="Trocar tema"
      >
        <span
          className="h-3 w-3 rounded-full ring-1 ring-[var(--border-2)] transition-transform hover:scale-110"
          style={{ background: current.swatch, boxShadow: `0 0 10px ${current.swatch}` }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 flex gap-1.5 rounded-xl border border-[var(--border-2)] bg-[var(--bg-2)]/90 p-2 shadow-2xl backdrop-blur-xl"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={`h-5 w-5 rounded-full transition-all hover:scale-125 ${
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

function BetaBadge() {
  return (
    <div className="fixed left-2 top-2 z-[60] flex items-center gap-1.5 rounded-full border border-[var(--border-2)] bg-[var(--bg-2)]/80 px-2.5 py-1 shadow-lg backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>
      <span className="text-[10px] font-mono text-[var(--text-3)]">Beta</span>
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
    const isMobile = window.innerWidth < 768;
    if (isMobile) document.body.style.paddingBottom = '80px';
    const handleResize = () => {
      document.body.style.paddingBottom = window.innerWidth < 768 ? '80px' : '';
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.paddingBottom = '';
    };
  }, []);

  return (
    <>
      <BetaBadge />
      {/* Floating glass sidebar — desktop */}
      <aside className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-2 shadow-2xl backdrop-blur-xl md:flex">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -inset-10 bg-[linear-gradient(45deg,transparent_30%,var(--accent-glow-soft)_50%,transparent_70%)] opacity-15 blur-3xl [animation:beam-drift_8s_ease-in-out_infinite]" />
        </div>

        <div className="relative flex flex-col items-center gap-1.5">
          <SocialPopover />
          <div className="h-[1px] w-4 bg-[var(--border)]" />
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
          <div className="h-[1px] w-4 bg-[var(--border)]" />
          <ThemeDot />
        </div>
      </aside>

      {/* Floating dock — mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--glass)] px-3.5 py-2 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -inset-10 bg-[linear-gradient(45deg,transparent_30%,var(--accent-glow-soft)_50%,transparent_70%)] opacity-10 blur-3xl [animation:beam-drift_8s_ease-in-out_infinite]" />
          </div>

          <div className="relative flex items-center gap-2">
            {NAV_LINKS.map((link, i) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center justify-center rounded-xl p-2 transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text-3)]'
                  }`}
                >
                  {isActive && (
                    <>
                      <motion.span
                        layoutId="mobile-glow"
                        className="absolute inset-0 rounded-xl border border-[var(--accent)]/15 bg-[var(--accent-glow-soft)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                      <motion.span
                        layoutId="active-tick-mobile"
                        className="absolute -bottom-1 left-1/2 h-[2px] w-3.5 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    </>
                  )}
                  <span className="relative">
                    <Icon size={16} />
                  </span>
                </a>
              );
            })}
            <div className="mx-1 h-4 w-[1px] bg-[var(--border)]" />
            <ThemeDot />
          </div>
        </div>
      </div>
    </>
  );
}
