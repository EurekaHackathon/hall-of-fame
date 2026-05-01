// 2025 — match live 2025.eurekahacks.ca:
// purple twilight, crescent moon, layered hills, cartoon trees, stars,
// orange duck mascot accent.
export default function Art2025() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #2c1f5c 0%, #4a3b8c 40%, #7c5fc2 75%, #b89cf2 100%)",
      }}
    >
      {/* stars — scattered across the upper sky */}
      {[
        ["8%", "8%", 14],
        ["22%", "18%", 10],
        ["38%", "6%", 12],
        ["52%", "22%", 8],
        ["66%", "10%", 16],
        ["82%", "20%", 11],
        ["94%", "6%", 9],
        ["14%", "32%", 8],
        ["72%", "30%", 9],
      ].map(([l, t, s], i) => (
        <div
          key={i}
          className="absolute font-archivo text-white/90 animate-twinkle pointer-events-none"
          style={{
            left: l,
            top: t,
            fontSize: `${s}px`,
            animationDelay: `${i * 0.35}s`,
            textShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
        >
          ✦
        </div>
      ))}

      {/* crescent moon — top-right */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ right: "10%", top: "12%" }}
      >
        <svg width="96" height="96" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFF6C8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FFF6C8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#moonGlow)" />
          <path
            d="M 65 18 A 36 36 0 1 0 65 82 A 28 28 0 1 1 65 18 Z"
            fill="#FFF6C8"
          />
        </svg>
      </div>

      {/* back hills — far layer */}
      <svg
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ bottom: 0, width: "100%", height: "55%" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,180 C160,120 320,160 480,140 C640,120 800,170 960,150 C1120,130 1280,170 1440,150 L1440,300 L0,300 Z"
          fill="#3a2a78"
          opacity="0.85"
        />
      </svg>

      {/* mid hills */}
      <svg
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ bottom: 0, width: "100%", height: "42%" }}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 C200,170 360,210 540,200 C720,190 900,230 1080,210 C1260,190 1380,220 1440,210 L1440,300 L0,300 Z"
          fill="#26195a"
          opacity="0.95"
        />
      </svg>

      {/* front hills — near layer */}
      <svg
        aria-hidden
        className="absolute inset-x-0 pointer-events-none"
        style={{ bottom: 0, width: "100%", height: "28%" }}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C220,110 420,150 640,130 C860,110 1080,160 1300,140 C1380,135 1440,150 1440,150 L1440,200 L0,200 Z"
          fill="#160d3d"
        />
      </svg>

      {/* cartoon trees — silhouettes scattered along the front hill */}
      {[
        { x: "12%", y: "78%", h: 70 },
        { x: "26%", y: "82%", h: 58 },
        { x: "40%", y: "80%", h: 64 },
        { x: "70%", y: "82%", h: 52 },
        { x: "84%", y: "80%", h: 60 },
      ].map((tr, i) => (
        <svg
          key={i}
          aria-hidden
          width={tr.h * 0.7}
          height={tr.h}
          viewBox="0 0 40 60"
          className="absolute pointer-events-none"
          style={{ left: tr.x, top: tr.y }}
        >
          {/* trunk */}
          <rect x="17" y="42" width="6" height="14" fill="#0a0628" />
          {/* foliage triangles, stacked */}
          <polygon points="20,4 4,30 36,30" fill="#0a0628" />
          <polygon points="20,16 6,38 34,38" fill="#0a0628" />
          <polygon points="20,28 8,46 32,46" fill="#0a0628" />
        </svg>
      ))}

      {/* clouds — drifting on the right, kept off the description */}
      {[
        { left: "60%", top: "12%", scale: 0.9, delay: "0s" },
        { left: "78%", top: "30%", scale: 1.1, delay: "-7s" },
        { left: "50%", top: "40%", scale: 0.7, delay: "-13s" },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute animate-drift pointer-events-none"
          style={{
            left: c.left,
            top: c.top,
            animationDelay: c.delay,
            transform: `scale(${c.scale})`,
            opacity: 0.85,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/2025/cloud${(i % 3) + 1}.svg`}
            alt=""
            draggable={false}
            style={{ width: 180, height: "auto", filter: "drop-shadow(0 4px 18px rgba(255,255,255,0.15))" }}
          />
        </div>
      ))}

      {/* duck mascot — official 2025 SVG */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/2025/duck.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute pointer-events-none select-none"
        style={{
          right: "6%",
          bottom: "10%",
          width: 150,
          height: "auto",
          filter: "drop-shadow(0 8px 22px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}
