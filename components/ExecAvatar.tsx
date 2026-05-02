"use client";
import type { Exec } from "@/lib/types";

export default function ExecAvatar({
  exec,
  accent,
  size = 44,
  onClick,
  active,
}: {
  exec: Exec;
  accent: string;
  size?: number;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={`${exec.name}, ${exec.role}`}
      className="group relative flex flex-col items-center gap-1.5 transition-transform hover:-translate-y-0.5 focus:outline-none"
      style={{ width: size }}
    >
      <span
        className="rounded-full grid place-items-center overflow-hidden font-archivo text-white text-[13px] tracking-tight border-2 transition-all"
        style={{
          width: size,
          height: size,
          background: exec.headshot
            ? "#0b0b10"
            : `linear-gradient(135deg, ${exec.ph1}, ${exec.ph2})`,
          borderColor: active ? accent : "rgba(255,255,255,0.55)",
          boxShadow: active
            ? `0 0 0 3px ${accent}55, 0 8px 22px rgba(0,0,0,0.45)`
            : "0 4px 14px rgba(0,0,0,0.45)",
        }}
      >
        {exec.headshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={exec.headshot}
            alt={exec.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          exec.initials
        )}
      </span>
    </button>
  );
}
