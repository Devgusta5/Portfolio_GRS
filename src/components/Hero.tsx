import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pb-12 pt-28 sm:px-8 lg:pt-24"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="relative z-10 max-w-xl shrink-0 text-center lg:text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Full Stack Developer
          </p>

          <h1 className="text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl md:text-8xl">
            Gustavo Rodrigues
          </h1>
        </div>

        <div className="relative -mr-40 ml-auto h-[700px] w-[700px] shrink-0 lg:-mr-60 lg:w-[800px]">
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
