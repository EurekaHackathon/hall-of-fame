import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        fraunces: ["var(--font-fraunces)", "serif"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        bungee: ["var(--font-bungee)", "cursive"],
        bungeeShade: ["var(--font-bungee-shade)", "cursive"],
        press: ["var(--font-press-start)", "monospace"],
        vt: ["var(--font-vt323)", "monospace"],
        caveat: ["var(--font-caveat)", "cursive"],
        instrument: ["var(--font-instrument-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        instrumentSerif: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        wifi: {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(40px)" },
        },
      },
      animation: {
        scan: "scan 8s linear infinite",
        blink: "blink 1s step-end infinite",
        "spin-slow": "spinSlow 60s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        wifi: "wifi 3s ease-out infinite",
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
