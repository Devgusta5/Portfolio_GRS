import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });
const HeroBackground = dynamic(() => import("./HeroBackground").then((m) => ({ default: m.HeroBackground })), { ssr: false });

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pb-12 pt-28 sm:px-8 lg:pt-24"
    >
      <HeroBackground />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center lg:flex-row">
        <div className="relative z-10 w-full max-w-xl text-center lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Full Stack Developer
          </p>

          <h1 className="text-4xl font-semibold leading-[0.96] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Gustavo Rodrigues
          </h1>
        </div>

        <div className="relative mt-6 hidden h-[400px] w-[400px] shrink-0 sm:h-[500px] sm:w-[500px] md:block md:h-[600px] md:w-[600px] lg:-mr-60 lg:mt-0 lg:h-[700px] lg:w-[800px]">
          <Lanyard
            position={[1, 2, 22]}
            fov={20}
            imageFit="cover"
            lanyardWidth={0.8}
          />
        </div>
      </div>
    </section>
  );
}
