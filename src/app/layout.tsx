import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeInitScript } from "@/components/ThemeInitScript";
import { CustomCursor } from "@/components/CustomCursor";

const SITE_URL = "https://gustavorodrigues.vercel.app";
const TITLE = "Gustavo Rodrigues - Desenvolvedor Full Stack";
const DESCRIPTION =
  "Portfolio de Gustavo Rodrigues, Desenvolvedor Full Stack focado em arquiteturas escalaveis, React, Next.js, Node.js e mobile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Gustavo Rodrigues",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Gustavo Rodrigues" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Gustavo Rodrigues",
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col md:pl-20">
        <a
          href="#main-content"
          className="fixed -left-full top-2 z-[100] rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm text-[var(--text)] shadow-2xl transition-all focus:left-2 focus:outline-2 focus:outline-[var(--accent)]"
        >
          Pular para o conteudo
        </a>
        <LanguageProvider><ThemeProvider>
          {children}
          <CustomCursor />
        </ThemeProvider></LanguageProvider>
      </body>
    </html>
  );
}
