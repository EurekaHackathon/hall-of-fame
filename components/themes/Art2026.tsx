export default function Art2026() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 100%)" }}>
      <div className="absolute inset-0 halftone opacity-40 pointer-events-none" />
      {/* radial pop lines — centered on the right */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <g stroke="#000" strokeWidth="2">
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={780 + Math.cos(a) * 60}
                y1={300 + Math.sin(a) * 60}
                x2={780 + Math.cos(a) * 600}
                y2={300 + Math.sin(a) * 600}
              />
            );
          })}
        </g>
      </svg>
      {/* POW! — top-right */}
      <div
        className="absolute right-[6%] top-[14%] font-bungee text-[#FDE047] -rotate-[8deg] select-none pointer-events-none"
        style={{
          fontSize: "clamp(64px, 8vw, 128px)",
          textShadow: "4px 4px 0 #000, 8px 8px 0 #FF6B9D, -2px -2px 0 #fff",
          WebkitTextStroke: "3px #000",
        }}
      >
        POW!
      </div>
      {/* BAM! — bottom-right */}
      <div
        className="absolute right-[14%] bottom-[18%] font-bungee text-[#22D3EE] rotate-[6deg] select-none pointer-events-none"
        style={{
          fontSize: "clamp(48px, 6vw, 96px)",
          textShadow: "3px 3px 0 #000, 6px 6px 0 #FF6B9D",
          WebkitTextStroke: "2px #000",
        }}
      >
        BAM!
      </div>
      {/* speech bubble */}
      <div className="absolute right-[8%] top-[55%] pointer-events-none">
        <div className="relative bg-white border-[3px] border-black rounded-3xl px-5 py-2.5 font-bungee text-xl text-black -rotate-2 shadow-[6px_6px_0_#000]">
          EUREKA!
          <div className="absolute -bottom-3 left-6 w-5 h-5 bg-white border-r-[3px] border-b-[3px] border-black rotate-45" />
        </div>
      </div>
    </div>
  );
}
