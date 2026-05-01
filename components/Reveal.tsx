"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { Exec } from "@/lib/types";

export default function Reveal({
  open,
  exec,
  roster,
  accent,
  onClose,
  onPick,
}: {
  open: boolean;
  exec: Exec | null;
  roster: Exec[];
  accent: string;
  onClose: () => void;
  onPick: (e: Exec) => void;
}) {
  return (
    <AnimatePresence>
      {open && exec && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 240 }}
          className="absolute inset-0 z-30 backdrop-blur-md grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 p-6 md:p-10"
          style={{ background: "rgba(8,8,12,0.94)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full grid place-items-center bg-white/10 hover:bg-white/20 text-white text-xl border border-white/15"
            aria-label="Close"
          >
            ×
          </button>

          {/* left: focused exec */}
          <div className="flex flex-col justify-center gap-5">
            <div
              className="w-28 h-28 rounded-full overflow-hidden grid place-items-center font-archivo text-white text-3xl"
              style={{
                background: exec.headshot
                  ? "#0b0b10"
                  : `linear-gradient(135deg, ${exec.ph1}, ${exec.ph2})`,
                boxShadow: `0 0 0 4px ${accent}55, 0 16px 40px rgba(0,0,0,.6)`,
              }}
            >
              {exec.headshot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={exec.headshot} alt={exec.name} className="w-full h-full object-cover" />
              ) : (
                exec.initials
              )}
            </div>
            <div>
              <div className="text-[11px] tracking-[0.2em] uppercase font-mono" style={{ color: accent }}>
                {exec.role}
              </div>
              <h3 className="font-archivo text-3xl md:text-4xl text-white">{exec.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm">
                <span className="text-white/55">University · </span>
                <span className="text-white">{exec.uni}</span>
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm">
                <span className="text-white/55">Now · </span>
                <span className="text-white">{exec.now}</span>
              </span>
              {exec.linkedin && (
                <a
                  href={exec.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                  style={{
                    background: `${accent}1f`,
                    border: `1px solid ${accent}66`,
                    color: accent,
                  }}
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* right: full roster */}
          <div className="flex flex-col min-h-0">
            <div className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/50 mb-3">
              Full roster
            </div>
            <div className="overflow-y-auto pr-1 -mr-1 flex flex-col gap-2">
              {roster.map((e) => {
                const isActive = e.name === exec.name;
                return (
                  <button
                    key={e.name}
                    onClick={() => onPick(e)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors text-left ${
                      isActive
                        ? "bg-white/10 border-white/25"
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className="w-9 h-9 rounded-full overflow-hidden grid place-items-center font-archivo text-white text-xs flex-shrink-0"
                      style={{
                        background: e.headshot
                          ? "#0b0b10"
                          : `linear-gradient(135deg, ${e.ph1}, ${e.ph2})`,
                      }}
                    >
                      {e.headshot ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.headshot} alt={e.name} className="w-full h-full object-cover" />
                      ) : (
                        e.initials
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="text-white text-sm font-medium truncate">{e.name}</div>
                      <div className="text-white/55 text-xs truncate">{e.role} · {e.now}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
