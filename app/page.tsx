import Mast from "@/components/Mast";
import Timeline from "@/components/Timeline";
import Banner from "@/components/Banner";
import Banner2027 from "@/components/Banner2027";
import Closing from "@/components/Closing";
import { YEARS } from "@/lib/years";

const YEAR_DATES: Record<number, { start: string; end: string }> = {
  2023: { start: "2023-05-13", end: "2023-05-13" },
  2024: { start: "2024-05-04", end: "2024-05-04" },
  2025: { start: "2025-04-05", end: "2025-04-05" },
  2026: { start: "2026-05-01", end: "2026-05-02" },
};

function buildJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EurekaHACKS",
    alternateName: "EurekaHACKS Hall of Fame",
    url: "https://eurekahacks.ca",
    logo: "/icon.png",
    sameAs: YEARS.filter((y) => y.website).map((y) => `https://${y.website}`),
    description:
      "EurekaHACKS is a high school hackathon based in Ontario, running annually since 2023.",
  };

  const events = YEARS.map((y) => {
    const dates = YEAR_DATES[y.year];
    return {
      "@context": "https://schema.org",
      "@type": "Hackathon",
      name: `EurekaHACKS ${y.year}`,
      description: y.desc,
      startDate: dates?.start,
      endDate: dates?.end,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: y.location,
        address: y.location,
      },
      organizer: {
        "@type": "Organization",
        name: "EurekaHACKS",
        url: "https://eurekahacks.ca",
      },
      url: y.website ? `https://${y.website}` : undefined,
      image: y.icon,
    };
  });

  return [organization, ...events];
}

export default function Page() {
  const jsonLd = buildJsonLd();
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Mast />
      <Timeline />
      {YEARS.map((y, i) => (
        <Banner key={y.year} year={y} idx={i} />
      ))}
      <Banner2027 />
      <Closing />
    </main>
  );
}
