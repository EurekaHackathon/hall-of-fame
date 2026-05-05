"use client";
import { useState } from "react";
import type { Year, Exec } from "@/lib/types";
import { ART } from "./themes";
import ExecAvatar from "./ExecAvatar";
import Reveal from "./Reveal";

// Yearbook polaroid layout — each year is a slightly tilted card on a dark backdrop.
export default function Banner({ year, idx }: { year: Year; idx: number }) {
  const [focused, setFocused] = useState<Exec | null>(null);
  const Art = ART[year.artComponent] ?? (() => null);
  const tilt = idx % 2 === 0 ? -1 : 1.2;

  return (
    <section
      id={`y${year.year}`}
      data-year={year.year}
      className="relative w-full px-4 md:px-12 py-12 md:py-20 flex justify-center"
      style={{ "--accent": year.accent } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 -z-10 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0) 60%)," +
            "linear-gradient(180deg, #0a0b10 0%, #06070b 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "3px 3px" }} />

      <article
        className="relative w-full max-w-[1180px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        style={{ transform: `rotate(${tilt}deg)`, minHeight: 560 }}
      >
        <div className="absolute inset-0 z-0"><Art /></div>
        <div className="absolute inset-0 z-10 banner-scrim" />
        {/* tape strip */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-7 z-30 rotate-[-3deg] bg-amber-200/30 border border-amber-200/40 backdrop-blur-sm" />

        <div className="relative z-20 grid gap-8 md:gap-12 p-8 md:p-12 min-h-[560px] md:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] items-start">
          {/* LEFT: text content */}
          <div className="flex flex-col gap-6 min-w-0 text-shadow-strong">
            <div className="min-w-0">
              <h2 className="font-archivo leading-[0.85] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(64px, 8vw, 120px)", textShadow: "0 6px 32px rgba(0,0,0,0.55)" }}>
                {year.year}
              </h2>
              <div className="mt-3 font-instrument text-white/70 text-[14px]">
                {year.location}
              </div>
            </div>
            <p className="lede font-fraunces italic text-white text-[16px] md:text-[18px] leading-[1.55] max-w-[55ch]"
              style={{ "--accent": year.accent } as React.CSSProperties}>
              {year.desc}
            </p>
            {year.website && (
              <a
                href={`https://${year.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-wide opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: year.accent }}
              >
                {year.website} ↗
              </a>
            )}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-1">
              {year.stats.map((s) => (
                <div key={s.l}>
                  <div className="font-archivo text-white text-xl">{s.n}</div>
                  <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: roster */}
          <aside className="flex flex-col gap-4 min-w-0 text-shadow-strong">
            <div className="flex items-baseline gap-2">
              <h4 className="font-instrumentSerif text-white text-[20px] tracking-tight">Directors</h4>
              <span className="font-instrument text-[13px] text-white/45">
                {year.execs.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {year.execs.map((e) => (
                <ExecAvatar key={e.name} exec={e} accent={year.accent} size={40}
                  active={focused?.name === e.name} onClick={() => setFocused(e)} />
              ))}
            </div>
          </aside>
        </div>

        <Reveal open={!!focused} exec={focused} roster={year.execs}
          accent={year.accent} onClose={() => setFocused(null)} onPick={setFocused} />
      </article>
    </section>
  );
}
