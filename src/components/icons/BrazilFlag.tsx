export function BrazilFlag({ size = 20 }: { size?: number }) {
  const h = Math.round(size * 0.7);
  return (
    <svg viewBox="0 0 36 25" width={size} height={h} className="shrink-0">
      <rect width="36" height="25" fill="#009739" rx="1" />
      <polygon points="18,3 22,11 31,11 24,17 26,25 18,20 10,25 12,17 5,11 14,11" fill="#FEDD00" />
      <circle cx="18" cy="14" r="4" fill="#002776" />
      <path d="M15,12 L21,12 L18,16 Z" fill="#FEDD00" />
    </svg>
  );
}
