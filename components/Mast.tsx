export default function Mast() {
  return (
    <div className="fixed top-5 left-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/12 shadow-lg">
      <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24]" />
      <span className="font-archivo text-white text-sm tracking-tight">EurekaHACKS</span>
      <span className="text-white/35 text-xs">·</span>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">Hall of Fame</span>
    </div>
  );
}
