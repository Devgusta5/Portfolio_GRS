import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeInitScript } from "@/components/ThemeInitScript";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Gustavo Rodrigues - Desenvolvedor Full Stack",
  description:
    "Portfolio de Gustavo Rodrigues, Desenvolvedor Full Stack focado em arquiteturas escalaveis, React, Next.js, Node.js e mobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("h-full antialiased", "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col lg:pl-20">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
