"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });
const DotFieldBackground = dynamic(() => import("./DotFieldBackground"), { ssr: false });

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-x-hidden px-6 pb-12 pt-28 sm:px-8 lg:pt-24"
    >
      <DotFieldBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center lg:flex-row">
        <div className="w-full max-w-xl text-center lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Full Stack Developer
          </p>

          <h1 className="text-4xl font-semibold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Gustavo Rodrigues
          </h1>
        </div>
      </div>

      {/* Lanyard — large element that overlaps hero content from the right */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-visible md:block">
        <div className="absolute right-0 top-1/2 aspect-square h-[150vh] w-auto max-w-[65vw] -translate-y-1/2 translate-x-[20%]">
          <Lanyard
            position={[2, 0, 18]}
            fov={18}
            imageFit="cover"
            lanyardWidth={0.8}
          />
        </div>
      </div>
    </section>
  );
}
