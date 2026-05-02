import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { applications } from "@/lib/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TEAMS = ["Web Dev", "Design", "Marketing", "Logistics", "Outreach"] as const;
type Team = (typeof TEAMS)[number];

type TeamRank = { team: Team; rank: number };

type Payload = {
  name: string;
  prefName?: string;
  school: string;
  grade: string;
  email: string;
  instagram?: string;
  discord: string;
  oneLine: string;
  teams: TeamRank[];
  flexible: string;
  why: string;
  hours: string;
  webProject?: string;
  stack?: string;
  portfolioUrl?: string;
  accountUrl?: string;
  wrongWithEvent?: string;
  coldEmail?: string;
  room4y: string;
  anything?: string;
  referrer?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return bad("invalid JSON");
  }

  const required: (keyof Payload)[] = [
    "name", "school", "grade", "email", "discord", "oneLine",
    "flexible", "why", "hours", "room4y",
  ];
  for (const k of required) {
    if (!body[k] || String(body[k]).trim() === "") return bad(`missing: ${k}`);
  }
  if (!EMAIL_RE.test(body.email)) return bad("invalid email");
  if (body.oneLine.length > 80) return bad("oneLine > 80 chars");

  if (!Array.isArray(body.teams) || body.teams.length === 0) {
    return bad("pick at least one team");
  }
  const ranks = new Set<number>();
  for (const t of body.teams) {
    if (!TEAMS.includes(t.team)) return bad(`unknown team: ${t.team}`);
    if (typeof t.rank !== "number" || t.rank < 1 || t.rank > 5) return bad("invalid rank");
    if (ranks.has(t.rank)) return bad("duplicate rank");
    ranks.add(t.rank);
  }

  // Per-team conditional required fields
  const checked = new Set(body.teams.map((t) => t.team));
  const requireFor = (team: Team, fields: (keyof Payload)[]) => {
    if (!checked.has(team)) return null;
    for (const f of fields) {
      if (!body[f] || String(body[f]).trim() === "") return `missing ${team} field: ${f}`;
    }
    return null;
  };
  const errs = [
    requireFor("Web Dev", ["webProject", "stack"]),
    requireFor("Design", ["portfolioUrl"]),
    requireFor("Marketing", ["accountUrl"]),
    requireFor("Logistics", ["wrongWithEvent"]),
    requireFor("Outreach", ["coldEmail"]),
  ].filter(Boolean);
  if (errs.length) return bad(errs[0]!);

  const teamsRanked = [...body.teams]
    .sort((a, b) => a.rank - b.rank)
    .map((t) => `${t.rank}:${t.team}`)
    .join(", ");

  const row = {
    submittedAt: new Date().toISOString(),
    name: body.name,
    prefName: body.prefName ?? "",
    school: body.school,
    grade: body.grade,
    email: body.email,
    instagram: body.instagram ?? "",
    discord: body.discord,
    oneLine: body.oneLine,
    teamsRanked,
    flexible: body.flexible,
    why: body.why,
    hours: body.hours,
    webProject: body.webProject ?? "",
    stack: body.stack ?? "",
    portfolioUrl: body.portfolioUrl ?? "",
    accountUrl: body.accountUrl ?? "",
    wrongWithEvent: body.wrongWithEvent ?? "",
    coldEmail: body.coldEmail ?? "",
    room4y: body.room4y,
    anything: body.anything ?? "",
    referrer: body.referrer ?? "",
  };

  if (!process.env.DATABASE_URL) {
    console.log("[/api/apply] DATABASE_URL unset — payload:", row);
    return NextResponse.json({ ok: true });
  }

  try {
    await db.insert(applications).values(row);
  } catch (e) {
    console.error("[/api/apply] postgres insert failed", e);
    return NextResponse.json(
      { ok: false, error: "database write failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
