export default function Closing() {
  return (
    <section className="relative px-6 md:px-12 py-20 md:py-28 max-w-[1200px] mx-auto">
      <blockquote className="relative px-8 md:px-16 py-12 md:py-16 rounded-2xl bg-gradient-to-br from-amber-300/10 via-transparent to-pink-400/10 border border-amber-300/25">
        <div className="absolute top-3 left-5 font-fraunces italic text-amber-300/40 text-7xl leading-none select-none">
          &ldquo;
        </div>
        <p className="font-fraunces italic text-white text-2xl md:text-3xl leading-snug max-w-3xl mx-auto text-center pt-4">
          You are{" "}
          <span className="text-amber-300">
            the average of the five people you spend the most time with.
          </span>
        </p>
        <footer className="mt-6 text-center font-mono text-[11px] tracking-[0.28em] uppercase text-white/55">
Jim Rohn
        </footer>
      </blockquote>

      <div className="mt-10 flex flex-col items-center justify-center gap-2 text-white/45 font-instrument text-[13px]">
        <div>EurekaHACKS, 2023 to 2026</div>
        <div>
          Site by{" "}
          <a
            href="https://easonhuang.dev"
            className="text-white/70 hover:text-amber-300 underline underline-offset-4 decoration-white/20 hover:decoration-amber-300/60 transition-colors"
            rel="author"
          >
            Eason Huang
          </a>
        </div>
      </div>
    </section>
  );
}
