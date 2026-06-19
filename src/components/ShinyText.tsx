import type { ReactNode } from "react";

export function ShinyText({ children }: { children: ReactNode }) {
  return <span className="text-shiny font-medium">{children}</span>;
}
