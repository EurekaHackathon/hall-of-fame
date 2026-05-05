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
  Instrument_Sans,
  Instrument_Serif,
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
const instrumentSans = Instrument_Sans({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-instrument-sans", display: "swap" });
const instrumentSerif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument-serif", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const siteTitle = "EurekaHACKS Hall of Fame";
const siteDescription =
  "Four editions, four cohorts, one environment. Explore the EurekaHACKS Hall of Fame, 2023 to 2026 — and apply to join the next cohort.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: siteTitle,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
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
          instrumentSans.variable,
          instrumentSerif.variable,
          "font-grotesk antialiased bg-[#06070b] text-white",
        ].join(" ")}
      >
        <Cursor />
        {children}
      </body>
    </html>
  );
}
