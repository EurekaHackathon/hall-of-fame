"use client";
import { YEARS } from "@/lib/years";
import type { Exec } from "@/lib/types";

const REASONS: { title: string; body: string; accent: string }[] = [
  {
    title: "Three years deep, and counting.",
    body:
      "Every cohort that came before is still a Discord message away. Waterloo SE undergrads, Cohere engineers, DECA ICDC winners, an HDSB Student Trustee, a startup founder with $1M raised. The network is the unfair advantage.",
    accent: "#FFC93C",
  },
  {
    title: "Find a room that pulls you forward.",
    body:
      "The right environment is the one where the people next to you are sharper, kinder, and a little further along, and quietly raise your bar without ever making it feel like a competition. That's the room we're trying to build, every year.",
    accent: "#7CFFCB",
  },
];

// Pull a small avatar stack from past years for the "alumni network" reason
const ALUMNI_STACK = [
  YEARS.find((y) => y.year === 2025)?.execs[0], // Eason
  YEARS.find((y) => y.year === 2025)?.execs[1], // Naman
  YEARS.find((y) => y.year === 2024)?.execs[0], // Adam
  YEARS.find((y) => y.year === 2024)?.execs[1], // David
  YEARS.find((y) => y.year === 2023)?.execs[0], // David Lim '23
].filter(Boolean) as Exec[];

export default function Banner2027() {
  return (
    <section
      id="y2027"
      data-year={2027}
      className="relative px-4 md:px-8 py-12 md:py-20 max-w-[1280px] mx-auto"
    >
      {/* tilted polaroid-ish frame, but DASHED to signal "not yet real" */}
      <div
        className="relative mx-auto"
        style={{ transform: "rotate(-0.6deg)" }}
      >
        {/* tape */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 z-20"
          style={{
            background:
              "repeating-linear-gradient(45deg, rgba(253,224,71,0.45) 0 6px, rgba(253,224,71,0.25) 6px 12px)",
            boxShadow: "0 4px 14px rgba(0,0,0,.5)",
            transform: "rotate(2deg)",
          }}
        />

        <article
          className="relative overflow-hidden rounded-[26px] bg-[#0a0a10]"
          style={{
            // Dashed border drawn via SVG so we get crisp dashes that match
            // the "blueprint / not yet built" vibe.
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* SVG dashed border overlay (animated march) */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="none"
          >
            <rect
              x="6"
              y="6"
              width="calc(100% - 12px)"
              height="calc(100% - 12px)"
              rx="22"
              ry="22"
              fill="none"
              stroke="rgba(255, 201, 60, 0.65)"
              strokeWidth="2"
              strokeDasharray="14 10"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-48"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>

          {/* atmospheric background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(120% 80% at 80% 0%, rgba(253,224,71,0.10), transparent 55%), radial-gradient(100% 80% at 0% 100%, rgba(167,139,250,0.10), transparent 55%), linear-gradient(180deg, #0a0a10 0%, #0d0c16 100%)",
            }}
          />
          {/* subtle scanlines */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)",
            }}
          />

          <div className="relative z-[5] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
            {/* LEFT — the mystery 2027 statement */}
            <div className="flex flex-col gap-6">
              <div>
                <h2
                  className="font-archivo text-white tracking-tight leading-[0.85]"
                  style={{ fontSize: "clamp(72px, 14vw, 168px)" }}
                >
                  20<span className="text-amber-300">2</span>
                  <span
                    className="inline-block relative align-baseline"
                    style={{ filter: "blur(0.5px)" }}
                  >
                    7
                    <span
                      aria-hidden
                      className="absolute -top-3 -right-5 font-fraunces italic font-extrabold text-amber-300/90"
                      style={{ fontSize: "0.42em" }}
                    >
                      ?
                    </span>
                  </span>
                </h2>
              </div>

              <p className="font-fraunces italic text-white/85 text-lg md:text-xl leading-relaxed max-w-xl">
                We're not announcing the theme yet. We're not announcing the venue yet. We're not
                announcing the prize pool yet. We're announcing the{" "}
                <span className="text-amber-300 not-italic font-archivo tracking-tight">
                  people we want next to us
                </span>{" "}
                , and inviting you to be one of them.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-archivo text-sm tracking-tight text-black bg-amber-300 hover:bg-amber-200 transition-colors shadow-[0_8px_30px_rgba(253,224,71,0.35)]"
                >
                  Apply for the 2027 exec
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT — three reasons stacked, with alumni network leading */}
            <div className="flex flex-col gap-3">
              {REASONS.map((r, i) => (
                <div
                  key={r.title}
                  className="relative rounded-xl p-4 md:p-5 transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px dashed rgba(255,255,255,0.18)",
                  }}
                >
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span
                      className="font-instrumentSerif text-[20px] leading-none"
                      style={{ color: r.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="font-instrumentSerif text-white text-[20px] md:text-[22px] leading-tight">
                      {r.title}
                    </div>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed">{r.body}</p>

                  {/* Alumni avatar stack on reason 01 only */}
                  {i === 0 && ALUMNI_STACK.length > 0 && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex -space-x-2.5">
                        {ALUMNI_STACK.map((e, idx) => (
                          <span
                            key={e.name}
                            className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#0a0a10] grid place-items-center text-[10px] font-archivo text-white"
                            style={{
                              background: e.headshot
                                ? "#0b0b10"
                                : `linear-gradient(135deg, ${e.ph1}, ${e.ph2})`,
                              zIndex: ALUMNI_STACK.length - idx,
                            }}
                            title={e.name}
                          >
                            {e.headshot ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={e.headshot}
                                alt={e.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              e.initials
                            )}
                          </span>
                        ))}
                        <span
                          className="w-8 h-8 rounded-full ring-2 ring-[#0a0a10] grid place-items-center text-[10px] font-mono text-amber-300 bg-amber-300/10 border border-amber-300/40"
                          style={{ zIndex: 0 }}
                        >
                          +30
                        </span>
                      </div>
                      <span className="font-instrument text-[12.5px] text-white/55">
                        Alumni from every cohort, still in the chat.
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </article>
      </div>
    </section>
  );
}
