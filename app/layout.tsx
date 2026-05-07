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
    : "https://apply.eurekahacks.ca";

const siteTitle = "EurekaHACKS Hall of Fame";
const siteDescription =
  "The full story of EurekaHACKS, from 2023 to 2026. Read about every cohort that built it and apply for the 2027 team.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Eason Huang", url: "https://easonhuang.dev" }],
  creator: "Eason Huang",
  publisher: "EurekaHACKS",
  category: "technology",
  keywords: [
    "EurekaHACKS",
    "EurekaHACKS Hall of Fame",
    "EurekaHACKS application",
    "apply to EurekaHACKS",
    "EurekaHACKS exec application",
    "high school hackathon",
    "Canadian hackathon",
    "Oakville hackathon",
    "Abbey Park",
    "Abbey Park High School",
    "Waterloo Accelerator Centre",
    "student hackathon",
    "Ontario hackathon",
    "EurekaHACKS exec",
    "EurekaHACKS 2027",
    "EurekaHACKS 2026",
    "EurekaHACKS 2025",
    "EurekaHACKS 2024",
    "EurekaHACKS 2023",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName: siteTitle,
    url: "/",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@EurekaHACKS",
    site: "@EurekaHACKS",
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
