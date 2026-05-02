"use client";

import { useMemo, useState } from "react";

const TEAMS = ["Web Dev", "Design", "Marketing", "Logistics", "Outreach"] as const;
type Team = (typeof TEAMS)[number];
type TeamRank = { team: Team; rank: number };

type FormState = {
  name: string;
  prefName: string;
  school: string;
  grade: string;
  email: string;
  instagram: string;
  discord: string;
  oneLine: string;
  teams: TeamRank[];
  flexible: string;
  why: string;
  hours: string;
  webProject: string;
  stack: string;
  portfolioUrl: string;
  accountUrl: string;
  wrongWithEvent: string;
  coldEmail: string;
  room4y: string;
  anything: string;
  referrer: string;
};

const EMPTY: FormState = {
  name: "", prefName: "", school: "", grade: "", email: "",
  instagram: "", discord: "", oneLine: "",
  teams: [],
  flexible: "", why: "", hours: "",
  webProject: "", stack: "",
  portfolioUrl: "",
  accountUrl: "",
  wrongWithEvent: "",
  coldEmail: "",
  room4y: "", anything: "", referrer: "",
};

const labelCls =
  "block font-instrument text-[13px] tracking-tight text-white/85 mb-2";
const helpCls =
  "mt-2 font-instrument text-[12.5px] text-white/45 leading-snug";
const inputCls =
  "w-full font-instrument text-[15px] bg-white/[0.025] border border-white/12 rounded-lg px-3.5 py-2.5 text-white placeholder-white/25 outline-none transition-all duration-150 focus:border-amber-300/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-amber-300/15";

export default function ApplyPage() {
  const [f, setF] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  const checked = useMemo(() => new Set(f.teams.map((t) => t.team)), [f.teams]);
  const sortedTeams = useMemo(
    () => [...f.teams].sort((a, b) => a.rank - b.rank),
    [f.teams]
  );

  const toggleTeam = (team: Team) => {
    setF((prev) => {
      const exists = prev.teams.find((t) => t.team === team);
      if (exists) {
        return { ...prev, teams: prev.teams.filter((t) => t.team !== team) };
      }
      const used = new Set(prev.teams.map((t) => t.rank));
      let next = 1;
      while (used.has(next)) next++;
      return { ...prev, teams: [...prev.teams, { team, rank: next }] };
    });
  };

  const setRank = (team: Team, rank: number) => {
    setF((prev) => {
      const conflict = prev.teams.find((t) => t.rank === rank && t.team !== team);
      const current = prev.teams.find((t) => t.team === team);
      if (!current) return prev;
      const oldRank = current.rank;
      return {
        ...prev,
        teams: prev.teams.map((t) => {
          if (t.team === team) return { ...t, rank };
          if (conflict && t.team === conflict.team) return { ...t, rank: oldRank };
          return t;
        }),
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (f.teams.length === 0) {
      setErrorMsg("Pick at least one team.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, teams: sortedTeams }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something broke. Try again?");
        return;
      }
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setErrorMsg("Network failed. Try again?");
    }
  };

  if (status === "success") {
    return (
      <main
        data-cursor-skip
        className="min-h-screen flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-xl text-center">
          <h1 className="font-instrumentSerif text-white text-6xl md:text-7xl leading-[0.95] mb-7 tracking-tight">
            Got it.
          </h1>
          <p className="font-instrument text-white/70 text-base md:text-lg leading-relaxed">
            We read every single one. We&apos;ll reach back out by{" "}
            <span className="text-amber-300">June at latest</span>.
          </p>
          <div className="mt-10">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-instrument text-[14px] text-white/55 hover:text-amber-300 transition-colors border-b border-white/15 hover:border-amber-300/60 pb-0.5"
            >
              ← Back to the Hall of Fame
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      data-cursor-skip
      className="relative px-5 md:px-10 py-14 md:py-20 max-w-[760px] mx-auto"
    >
      {/* header */}
      <header className="mb-16 md:mb-24">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 font-instrument text-[13px] text-white/45 hover:text-amber-300 transition-colors mb-12"
        >
          <span aria-hidden>←</span> Hall of Fame
        </a>
        <h1
          className="font-instrumentSerif text-white tracking-[-0.02em] leading-[0.95]"
          style={{ fontSize: "clamp(44px, 6.5vw, 76px)" }}
        >
          Apply to the{" "}
          <em className="not-italic text-amber-300">2027 exec</em>.
        </h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-20">
        <Section num="01" title="The basics">
          <Grid>
            <Field label="Full name" required>
              <input className={inputCls} required value={f.name}
                onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Preferred name / pronouns">
              <input className={inputCls} value={f.prefName}
                onChange={(e) => set("prefName", e.target.value)} />
            </Field>
            <Field label="School (Sept 2026)" required>
              <input className={inputCls} required value={f.school}
                onChange={(e) => set("school", e.target.value)} />
            </Field>
            <Field label="Grade in Sept 2026" required>
              <select className={inputCls} required value={f.grade}
                onChange={(e) => set("grade", e.target.value)}>
                <option value="" disabled>Select</option>
                <option>9</option><option>10</option><option>11</option><option>12</option>
                <option>Gap year</option><option>Other</option>
              </select>
            </Field>
            <Field label="Email" required>
              <input type="email" className={inputCls} required value={f.email}
                onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Instagram handle">
              <input className={inputCls} placeholder="@" value={f.instagram}
                onChange={(e) => set("instagram", e.target.value)} />
            </Field>
            <Field label="Discord username" required>
              <input className={inputCls} required value={f.discord}
                onChange={(e) => set("discord", e.target.value)} />
            </Field>
          </Grid>
          <Field
            label="One line on how you'd describe yourself"
            required
            help="Be honest. We're not grading the answer."
          >
            <input
              className={inputCls}
              required
              maxLength={80}
              value={f.oneLine}
              onChange={(e) => set("oneLine", e.target.value)}
            />
            <CharCount cur={f.oneLine.length} max={80} />
          </Field>
        </Section>

        <Section num="02" title="Fit">
          <Field
            label="Pick the teams you want to be on, then rank them"
            required
            help="Check any teams you'd be excited to join. The number is your interest order. 1 is your top pick."
          >
            <div className="rounded-lg border border-white/12 divide-y divide-white/10 overflow-hidden bg-white/[0.015]">
              {TEAMS.map((team) => {
                const active = checked.has(team);
                const rank = f.teams.find((t) => t.team === team)?.rank;
                return (
                  <label
                    key={team}
                    className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors ${
                      active ? "bg-amber-300/[0.05]" : "hover:bg-white/[0.025]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleTeam(team)}
                      className="w-4 h-4 accent-amber-300"
                    />
                    <span
                      className={`flex-1 font-instrument text-[15px] tracking-tight ${
                        active ? "text-white" : "text-white/65"
                      }`}
                    >
                      {team}
                    </span>
                    <select
                      disabled={!active}
                      value={rank ?? ""}
                      onChange={(e) => setRank(team, Number(e.target.value))}
                      className={`font-instrument text-[13px] px-2.5 py-1 rounded border bg-transparent transition-colors ${
                        active
                          ? "border-amber-300/55 text-amber-300"
                          : "border-white/10 text-white/25"
                      } disabled:cursor-not-allowed`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="" disabled>Rank</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n} className="bg-[#0a0a10]">#{n}</option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
          </Field>

          <Field
            label="If we end up placing you on a team you didn't rank #1, are you still in?"
            required
          >
            <Radios
              name="flexible"
              value={f.flexible}
              onChange={(v) => set("flexible", v)}
              options={["Yes", "Depends, let's talk", "Honestly no"]}
            />
          </Field>

          <Field
            label="Why EurekaHACKS specifically?"
            required
            help="Don't say 'I love hackathons.' We've read it 200 times."
          >
            <textarea
              className={inputCls}
              required
              rows={4}
              maxLength={500}
              value={f.why}
              onChange={(e) => set("why", e.target.value)}
            />
            <CharCount cur={f.why.length} max={500} />
          </Field>

          <Field
            label="Realistic weekly hours, Sept 2026 → May 2027"
            required
          >
            <Radios
              name="hours"
              value={f.hours}
              onChange={(v) => set("hours", v)}
              options={["1–3 hours", "4–6 hours", "7+ hours"]}
            />
          </Field>
        </Section>

        {sortedTeams.length > 0 && (
          <Section
            num="03"
            title="Show us"
            subtitle="One short block per team you ranked. Skipped teams disappear."
          >
            <div className="space-y-10">
              {sortedTeams.map((t) => (
                <TeamBlock
                  key={t.team}
                  team={t.team}
                  rank={t.rank}
                  f={f}
                  set={set}
                />
              ))}
            </div>
          </Section>
        )}

        <Section num="04" title="The human bit">
          <Field
            label="What's the room you'd want to be in 4 years from now?"
            required
          >
            <textarea
              className={inputCls}
              required
              rows={4}
              value={f.room4y}
              onChange={(e) => set("room4y", e.target.value)}
            />
          </Field>
          <Field
            label="Anything we should know?"
            help="Vacations, exam stress, cofounding a startup, anything."
          >
            <textarea
              className={inputCls}
              rows={3}
              value={f.anything}
              onChange={(e) => set("anything", e.target.value)}
            />
          </Field>
          <Field label="Who on the current team referred you, if anyone?">
            <input
              className={inputCls}
              value={f.referrer}
              onChange={(e) => set("referrer", e.target.value)}
            />
          </Field>
        </Section>

        <div className="pt-10 border-t border-white/8">
          {errorMsg && (
            <div className="mb-6 px-4 py-3 rounded-lg border border-red-400/30 bg-red-400/[0.06] text-red-200 font-instrument text-[14px]">
              {errorMsg}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-full font-instrument text-[15px] tracking-tight bg-amber-300 hover:bg-amber-200 transition-colors shadow-[0_10px_40px_-10px_rgba(253,224,71,0.6)] disabled:opacity-60 disabled:cursor-wait"
              style={{ color: "#0a0a10" }}
            >
              {status === "submitting" ? "Sending…" : "Send it"}
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </button>
            <span className="font-instrument text-[13px] text-white/40">
              You can edit until you hit submit.
            </span>
          </div>
        </div>
      </form>
    </main>
  );
}

/* ── helpers ─────────────────────────────────────────────── */

function Section({
  num, title, subtitle, children,
}: {
  num: string; title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <section className="space-y-9">
      <header className="flex items-baseline gap-5">
        <span
          aria-hidden
          className="font-instrumentSerif text-amber-300/80 leading-none tracking-tight"
          style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
        >
          {num}
        </span>
        <div>
          <h2
            className="font-instrumentSerif text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(28px, 3.4vw, 38px)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 font-instrument text-white/50 text-[14px] leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      </header>
      <div className="space-y-7">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">{children}</div>;
}

function Field({
  label, required, help, children,
}: {
  label: string; required?: boolean; help?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-amber-300 ml-1">*</span>}
      </label>
      {children}
      {help && <p className={helpCls}>{help}</p>}
    </div>
  );
}

function CharCount({ cur, max }: { cur: number; max: number }) {
  const near = cur >= max * 0.9;
  return (
    <div
      className={`mt-1.5 text-right font-instrument text-[12px] tabular-nums ${
        near ? "text-amber-300" : "text-white/30"
      }`}
    >
      {cur} / {max}
    </div>
  );
}

function Radios({
  name, value, onChange, options,
}: {
  name: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <label
            key={opt}
            className={`cursor-pointer px-4 py-2 rounded-full border font-instrument text-[14px] transition-colors ${
              active
                ? "border-amber-300 bg-amber-300/10 text-amber-300"
                : "border-white/15 text-white/65 hover:border-white/30 hover:text-white"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={active}
              onChange={() => onChange(opt)}
              className="sr-only"
              required
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

function TeamBlock({
  team, rank, f, set,
}: {
  team: Team;
  rank: number;
  f: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
      <div className="flex items-baseline gap-2.5 mb-5">
        <span className="font-instrumentSerif text-amber-300 text-[22px] leading-none tracking-tight">
          #{rank}
        </span>
        <span className="font-instrument text-[15px] tracking-tight text-white">
          {team}
        </span>
      </div>

      {team === "Web Dev" && (
        <div className="space-y-5">
          <Field
            label="A website or tool you've built"
            required
            help="Hackathon project preferred, but anything you shipped works. Drop a link or a short description."
          >
            <textarea
              className={inputCls}
              required
              rows={3}
              placeholder="https://... or describe the thing"
              value={f.webProject}
              onChange={(e) => set("webProject", e.target.value)}
            />
          </Field>
          <Field
            label="What stack do you reach for?"
            required
            help="We run Next.js + Supabase + Drizzle + Resend. Yours doesn't need to match. Tell us what you're comfortable in."
          >
            <input
              className={inputCls}
              required
              placeholder="e.g. Next.js + Postgres + Tailwind"
              value={f.stack}
              onChange={(e) => set("stack", e.target.value)}
            />
          </Field>
        </div>
      )}

      {team === "Design" && (
        <div className="space-y-5">
          <Field
            label="Show us your design work"
            required
            help="Drop one or more links: Figma, Behance, IG, Notion, Dribbble, a Drive folder, whatever. Add a sentence next to each if you want to point us at the right thing."
          >
            <textarea
              className={inputCls}
              required
              rows={6}
              placeholder={"https://figma.com/...   case study for an event poster system\nhttps://instagram.com/...   personal feed, mostly typography\nhttps://drive.google.com/...   older school project, scroll past the first one"}
              value={f.portfolioUrl}
              onChange={(e) => set("portfolioUrl", e.target.value)}
            />
          </Field>
        </div>
      )}

      {team === "Marketing" && (
        <div className="space-y-5">
          <Field
            label="Show us your work"
            required
            help="Accounts you run, posts/reels/threads you've made, campaigns you've shipped, anything. Drop one or more links and add a sentence next to each if context helps."
          >
            <textarea
              className={inputCls}
              required
              rows={6}
              placeholder={"https://instagram.com/...   account I run for my school's DECA chapter, ~2k followers\nhttps://tiktok.com/@.../video/...   single reel that hit 80k views\nhttps://twitter.com/.../status/...   thread I wrote that got picked up"}
              value={f.accountUrl}
              onChange={(e) => set("accountUrl", e.target.value)}
            />
          </Field>
        </div>
      )}

      {team === "Logistics" && (
        <div className="space-y-5">
          <Field
            label="One thing wrong with our current event, or any other hackathon you've been to"
            required
            help="We'd rather hear a sharp critique than empty praise. Be specific."
          >
            <textarea
              className={inputCls}
              required
              rows={6}
              value={f.wrongWithEvent}
              onChange={(e) => set("wrongWithEvent", e.target.value)}
            />
          </Field>
        </div>
      )}

      {team === "Outreach" && (
        <div className="space-y-5">
          <Field
            label="Draft 2 cold emails to sponsors we don't have yet. Pick the companies."
            required
            help="We'll grade voice and research instinct, not formality. Separate the two emails clearly."
          >
            <textarea
              className={inputCls}
              required
              rows={10}
              placeholder={"Email 1, to [Company]\nSubject: ...\n\n...\n\n///\n\nEmail 2, to [Company]\nSubject: ...\n\n..."}
              value={f.coldEmail}
              onChange={(e) => set("coldEmail", e.target.value)}
            />
          </Field>
        </div>
      )}
    </div>
  );
}
