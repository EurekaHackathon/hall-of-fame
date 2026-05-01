// 2023 — match the live 2023.eurekahacks.ca aesthetic:
// dark navy #191820 + signature orange #FF9D02, Source Code Pro monospace,
// hexagonal circuit-trace logo, code-editor energy.
export default function Art2023() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 20%, rgba(255,157,2,0.18), transparent 55%), linear-gradient(180deg, #191820 0%, #131217 100%)",
      }}
    >
      {/* faint dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,157,2,0.18) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* ── real 2023 hex logo (matches /icons/2023.png) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/2023.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute -right-8 top-6 opacity-95 pointer-events-none select-none"
        style={{
          width: 320,
          height: 320,
          filter: "drop-shadow(0 18px 40px rgba(255,157,2,0.35))",
        }}
      />

      {/* ── code-editor block, bottom-right ── */}
      <div
        className="absolute right-6 md:right-10 bottom-8 md:bottom-10 pointer-events-none select-none rounded-md overflow-hidden"
        style={{
          width: 360,
          maxWidth: "44%",
          background: "rgba(39,37,50,0.85)",
          border: "1px solid rgba(255,157,2,0.35)",
          boxShadow: "0 18px 60px rgba(0,0,0,0.6)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-1.5 px-3 py-2 border-b"
          style={{ background: "#1d1c25", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <span
            className="ml-3 text-[10px] tracking-[0.18em]"
            style={{
              fontFamily: "'Source Code Pro', ui-monospace, monospace",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            eureka_2023.py
          </span>
        </div>
        <pre
          className="px-4 py-3 leading-relaxed"
          style={{
            fontFamily: "'Source Code Pro', ui-monospace, monospace",
            fontSize: 11,
            color: "#E8E3D6",
          }}
        >
{`> from openai import OpenAI
> ${" "}
> client = OpenAI()                 `}
          <span style={{ color: "#FF9D02" }}>{"# May 13, 2023"}</span>
          {`
> while building:
>     `}<span style={{ color: "#22F0E7" }}>build</span>{"(\""}
          <span style={{ color: "#FFDF63" }}>chatbot wrapper</span>
          {`")
>     `}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>{"# is this a project?"}</span>
          {`
> insert_coin()`}
        </pre>
      </div>

      {/* "PRESS START" tag */}
      <div className="absolute right-7 bottom-3 pointer-events-none">
        <span
          className="select-none"
          style={{
            fontFamily: "'Source Code Pro', ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#FF9D02",
            textShadow: "0 0 10px rgba(255,157,2,0.6)",
          }}
        >
          ▸ PRESS START
        </span>
      </div>

      {/* faint mountain-wave divider, bottom */}
      <svg
        aria-hidden
        className="absolute inset-x-0 -bottom-px w-full h-24 opacity-60 pointer-events-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C240,40 480,90 720,60 C960,30 1200,80 1440,50 L1440,100 L0,100 Z"
          fill="rgba(255,157,2,0.08)"
        />
      </svg>
    </div>
  );
}
