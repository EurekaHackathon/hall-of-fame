// 2024 — match live 2024.eurekahacks.ca:
// bright cyan→pink radial gradient backdrop, hex logo, soft accent confetti.
export default function Art2024() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 18% 20%, #22F0E7 0%, rgba(34,240,231,0.55) 28%, transparent 60%), radial-gradient(120% 90% at 85% 95%, #DF71EF 0%, rgba(223,113,239,0.55) 30%, transparent 62%), linear-gradient(135deg, #FFE4FB 0%, #C8FBF8 100%)",
      }}
    >
      {/* soft sheen layer */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 110%, rgba(255,255,255,0.55), transparent 60%)",
        }}
      />

      {/* dot grid (subtle, white over the bright bg) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* confetti accents — small floating squares + dots in the live site palette */}
      {[
        { x: "8%", y: "14%", s: 12, c: "#FFDF63", rot: 18 },
        { x: "20%", y: "78%", s: 10, c: "#EC3B54", rot: -8 },
        { x: "44%", y: "30%", s: 8, c: "#24C68D", rot: 22 },
        { x: "62%", y: "70%", s: 14, c: "#FFDF63", rot: -14 },
        { x: "78%", y: "10%", s: 10, c: "#EC3B54", rot: 6 },
        { x: "30%", y: "46%", s: 6, c: "#24C68D", rot: 0 },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            background: d.c,
            transform: `rotate(${d.rot}deg)`,
            boxShadow: `0 0 12px ${d.c}88`,
            opacity: 0.85,
          }}
        />
      ))}

      {/* ── real 2024 hex logo (matches /icons/2024.png) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/2024.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute -right-8 top-4 opacity-95 pointer-events-none select-none"
        style={{
          width: 320,
          height: 320,
          filter: "drop-shadow(0 18px 40px rgba(34,240,231,0.35))",
        }}
      />

      {/* eyebrow strapline */}
      <div
        className="absolute bottom-6 left-8 pointer-events-none"
        style={{
          fontFamily: "'Source Code Pro', ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: "rgba(11,11,16,0.55)",
        }}
      >
        // WHERE_IDEAS_MEET_INNOVATION
      </div>
    </div>
  );
}
