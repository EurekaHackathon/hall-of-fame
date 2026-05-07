import type { Metadata } from "next";

const title = "Apply to the 2027 Exec";
const description =
  "Apply to join the EurekaHACKS 2027 exec team. Web Dev, Design, Marketing, Logistics, or Outreach. We read every application.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/apply",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
