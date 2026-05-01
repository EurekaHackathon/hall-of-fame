"use client";
import { useEffect, useRef, useState } from "react";
import { YEARS } from "@/lib/years";

type Hover =
  | { kind: "year"; year: number; accent: string; icon?: string }
  | { kind: "future"; accent: string }
  | null;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover>(null);
  const [enabled, setEnabled] = useState(false);
  const raf = useRef<number | null>(null);
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-eureka");

    const lookup = new Map(
      YEARS.map((y) => [y.year, { accent: y.accent, icon: y.icon }])
    );

    const findHover = (x: number, y: number): Hover => {
      const els = document.elementsFromPoint(x, y);
      // If the topmost UI is the timeline sidebar, suppress the icon cursor —
      // otherwise the icon stacks over the sidebar and looks broken.
      for (const el of els) {
        if ((el as HTMLElement).closest?.("[data-cursor-skip]")) return null;
      }
      for (const el of els) {
        const sec = (el as HTMLElement).closest?.(
          "[data-year]"
        ) as HTMLElement | null;
        if (sec?.dataset.year) {
          const yr = Number(sec.dataset.year);
          if (yr === 2027) return { kind: "future", accent: "#FDE047" };
          const v = lookup.get(yr);
          if (v) return { kind: "year", year: yr, accent: v.accent, icon: v.icon };
        }
      }
      return null;
    };

    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const { x, y } = mouse.current;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
        const next = findHover(x, y);
        setHover((prev) => {
          if (!prev && !next) return prev;
          if (prev?.kind !== next?.kind) return next;
          if (
            prev?.kind === "year" &&
            next?.kind === "year" &&
            prev.year === next.year
          )
            return prev;
          if (prev?.kind === "future" && next?.kind === "future") return prev;
          return next;
        });
      });
    };
    const leave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("cursor-eureka");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: 1, willChange: "transform" }}
    >
      {hover?.kind === "year" && hover.icon ? (
        // Bare logo. No circle wrapper. Just the hex floating with a glow so it
        // remains legible on light or dark surfaces.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hover.icon}
          alt=""
          draggable={false}
          style={{
            display: "block",
            width: 40,
            height: 40,
            filter: `drop-shadow(0 0 10px ${hover.accent}cc) drop-shadow(0 0 24px ${hover.accent}55)`,
          }}
        />
      ) : hover?.kind === "future" ? (
        // 2027 — mystery question mark
        <div
          className="font-archivo grid place-items-center select-none"
          style={{
            width: 40,
            height: 40,
            fontSize: 38,
            fontWeight: 800,
            lineHeight: 1,
            color: hover.accent,
            textShadow: `0 0 14px ${hover.accent}cc, 0 0 32px ${hover.accent}55`,
            fontStyle: "italic",
          }}
        >
          ?
        </div>
      ) : (
        // Off-card default — small luminous accent dot
        <div
          className="relative grid place-items-center w-5 h-5 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #FFC93C, #FFC93C55 55%, transparent 78%)",
            boxShadow:
              "0 0 0 1px #FFC93C66, 0 0 14px #FFC93Caa, 0 0 30px #FFC93C55",
          }}
        >
          <span
            className="block w-1 h-1 rounded-full"
            style={{ background: "#0b0b10", opacity: 0.9 }}
          />
        </div>
      )}
    </div>
  );
}
