import type { Lang } from "@/types/i18n";
import BR from "country-flag-icons/react/3x2/BR";
import US from "country-flag-icons/react/3x2/US";
import ES from "country-flag-icons/react/3x2/ES";

const FLAGS: Record<Lang, typeof BR> = {
  pt: BR,
  en: US,
  es: ES,
};

export function FlagIcon({ lang, size = 16 }: { lang: Lang; size?: number }) {
  const Flag = FLAGS[lang];
  const h = Math.round(size * 0.667);
  return (
    <span
      className="inline-flex items-center justify-center leading-none shrink-0"
      style={{ width: size, height: h }}
      role="img"
      aria-label={lang === "pt" ? "Português" : lang === "en" ? "English" : "Español"}
    >
      <Flag style={{ width: "100%", height: "100%" }} />
    </span>
  );
}
