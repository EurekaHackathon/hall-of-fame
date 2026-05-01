"use client";
import { useEffect, useRef, useState } from "react";
import { YEARS } from "@/lib/years";

const RAIL_HEIGHT = 480;
const SNAP_THRESHOLD = 0.04; // within 4% — traveler "docks" on a checkpoint

// Combined checkpoint set: real years + the mysterious 2027 future slot
type Stop =
  | { kind: "year"; year: number; theme: string; accent: string; icon?: string }
  | { kind: "future"; year: 2027; accent: string };

const STOPS: Stop[] = [
  ...YEARS.map(
    (y): Stop => ({
      kind: "year",
      year: y.year,
      theme: y.theme,
      accent: y.accent,
      icon: y.icon,
    })
  ),
  { kind: "future", year: 2027, accent: "#FDE047" },
];

export default function Timeline() {
  const [progress, setProgress] = useState(0);
  const tick = useRef<number | null>(null);

  useEffect(() => {
    // Sections that scroll-snap to: the real year banners + the 2027 banner
    const idsForStops = STOPS.map((s) =>
      s.kind === "year" ? `y${s.year}` : `y2027`
    );
    const sections = idsForStops
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      if (tick.current) return;
      tick.current = requestAnimationFrame(() => {
        tick.current = null;
        if (sections.length === 0) {
          setProgress(0);
          return;
        }

        const center = window.scrollY + window.innerHeight * 0.5;
        const mids = sections.map((s) => s.offsetTop + s.offsetHeight / 2);

        let p: number;
        if (center <= mids[0]) {
          p = 0;
        } else if (center >= mids[mids.length - 1]) {
          p = 1;
        } else {
          let i = 0;
          for (; i < mids.length - 1; i++) {
            if (center < mids[i + 1]) break;
          }
          const segLen = mids[i + 1] - mids[i];
          const local = segLen > 0 ? (center - mids[i]) / segLen : 0;
          p = (i + local) / (mids.length - 1);
        }
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = STOPS.length;
  const checkpoints = STOPS.map((_, i) => (n > 1 ? i / (n - 1) : 0));

  let nearestIdx = 0;
  let nearestDist = Infinity;
  for (let i = 0; i < checkpoints.length; i++) {
    const d = Math.abs(checkpoints[i] - progress);
    if (d < nearestDist) {
      nearestDist = d;
      nearestIdx = i;
    }
  }
  const docked = nearestDist <= SNAP_THRESHOLD;
  const activeStop = STOPS[nearestIdx];

  return (
    <div
      data-cursor-skip
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center px-3 py-5 rounded-full bg-black/55 backdrop-blur-md border border-white/12 shadow-2xl"
    >
      <div
        className="relative w-10 flex flex-col items-center"
        style={{ height: RAIL_HEIGHT }}
      >
        {/* center rail — 2px solid so Firefox actually renders it (1px
            gradient elements get dropped at sub-pixel widths). */}
        <div
          className="absolute inset-y-0 left-1/2"
          style={{
            width: 2,
            marginLeft: -1,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.10))",
          }}
        />
        {/* progress fill */}
        <div
          className="absolute top-0 left-1/2 transition-[height] duration-150"
          style={{
            width: 2,
            marginLeft: -1,
            height: `${progress * 100}%`,
            background: `linear-gradient(180deg, ${STOPS[0].accent}, ${activeStop.accent})`,
            boxShadow: `0 0 10px ${activeStop.accent}aa`,
          }}
        />

        {/* checkpoints */}
        {STOPS.map((s, i) => {
          // Hide the nearest checkpoint always — the traveler "carries" its
          // icon as it approaches, so we never show two of the same on top of
          // each other (was a docking-only rule that left both visible mid-snap
          // on Firefox).
          const hidden = i === nearestIdx;
          const top = checkpoints[i] * 100;
          const isFuture = s.kind === "future";

          return (
            <a
              key={isFuture ? "future" : (s as Extract<Stop, {kind:"year"}>).year}
              href={`#y${s.year}`}
              aria-label={isFuture ? "2027 · ???" : `${s.year} · ${(s as Extract<Stop, {kind:"year"}>).theme}`}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${top}%`,
                opacity: hidden ? 0 : 1,
                transition: "opacity 180ms ease",
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <span
                className="block rounded-full grid place-items-center overflow-hidden"
                style={{
                  width: 22,
                  height: 22,
                  background: "#0b0b10",
                  border: isFuture
                    ? `1.5px dashed ${s.accent}aa`
                    : "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {isFuture ? (
                  <span
                    className="font-archivo italic"
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: s.accent,
                    }}
                  >
                    ?
                  </span>
                ) : (s as Extract<Stop, {kind:"year"}>).icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(s as Extract<Stop, {kind:"year"}>).icon}
                    alt=""
                    className="w-[80%] h-[80%] object-contain"
                    style={{ opacity: 0.9 }}
                    draggable={false}
                  />
                ) : (
                  <span
                    className="font-archivo text-[10px] leading-none"
                    style={{ color: "#0b0b10" }}
                  >
                    {String((s as Extract<Stop, {kind:"year"}>).year).slice(-2)}
                  </span>
                )}
              </span>
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-mono tracking-wide text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/85 px-2 py-1 rounded border border-white/10">
                {isFuture ? "2027 · ???" : `${s.year} · ${(s as Extract<Stop, {kind:"year"}>).theme}`}
              </span>
            </a>
          );
        })}

        {/* moving traveler — adopts active stop's identity */}
        <div
          className="absolute left-1/2 pointer-events-none"
          style={{
            top: `${progress * 100}%`,
            transform: "translate(-50%, -50%)",
            transition: "top 120ms linear",
          }}
        >
          <span
            className="block rounded-full grid place-items-center overflow-hidden"
            style={{
              width: docked ? 32 : 26,
              height: docked ? 32 : 26,
              background: "#0b0b10",
              border:
                activeStop.kind === "future"
                  ? `2px dashed ${activeStop.accent}`
                  : `2px solid ${activeStop.accent}`,
              boxShadow: `0 0 0 4px ${activeStop.accent}33, 0 0 18px ${activeStop.accent}aa`,
              transition:
                "width 180ms ease, height 180ms ease, box-shadow 180ms ease",
            }}
          >
            {activeStop.kind === "future" ? (
              <span
                className="font-archivo italic"
                style={{
                  fontSize: docked ? 18 : 15,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: activeStop.accent,
                }}
              >
                ?
              </span>
            ) : activeStop.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeStop.icon}
                alt=""
                className="w-[80%] h-[80%] object-contain"
                draggable={false}
              />
            ) : (
              <span
                className="font-archivo text-[10px] leading-none"
                style={{ color: "#0b0b10" }}
              >
                {String(activeStop.year).slice(-2)}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
