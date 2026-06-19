export function InteractiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 62%, transparent 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(to_bottom,var(--accent-glow-soft),transparent)] opacity-45" />
    </div>
  );
}
