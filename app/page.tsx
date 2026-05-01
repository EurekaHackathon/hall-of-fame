import Mast from "@/components/Mast";
import Timeline from "@/components/Timeline";
import Banner from "@/components/Banner";
import Banner2027 from "@/components/Banner2027";
import Closing from "@/components/Closing";
import { YEARS } from "@/lib/years";

export default function Page() {
  return (
    <main className="relative">
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
