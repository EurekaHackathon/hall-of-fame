import type { Metadata } from "next";
import {
  Archivo_Black,
  Fraunces,
  Space_Grotesk,
  JetBrains_Mono,
  Bungee,
  Bungee_Shade,
  Press_Start_2P,
  VT323,
  Caveat,
} from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const fraunces = Fraunces({ weight: ["400", "800"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const bungee = Bungee({ weight: "400", subsets: ["latin"], variable: "--font-bungee", display: "swap" });
const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"], variable: "--font-bungee-shade", display: "swap" });
const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start", display: "swap" });
const vt = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export const metadata: Metadata = {
  title: "EurekaHACKS — Hall of Fame",
  description:
    "Four editions, four cohorts, one environment. The EurekaHACKS Hall of Fame: 2023—2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={[
          archivo.variable,
          fraunces.variable,
          grotesk.variable,
          jetbrains.variable,
          bungee.variable,
          bungeeShade.variable,
          pressStart.variable,
          vt.variable,
          caveat.variable,
          "font-grotesk antialiased bg-[#06070b] text-white",
        ].join(" ")}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
