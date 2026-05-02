import { pgTable, bigserial, timestamp, text } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  insertedAt: timestamp("inserted_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  submittedAt: text("submittedAt"),
  name: text("name"),
  prefName: text("prefName"),
  school: text("school"),
  grade: text("grade"),
  email: text("email"),
  instagram: text("instagram"),
  discord: text("discord"),
  oneLine: text("oneLine"),
  teamsRanked: text("teamsRanked"),
  flexible: text("flexible"),
  why: text("why"),
  hours: text("hours"),
  webProject: text("webProject"),
  stack: text("stack"),
  github: text("github"),
  portfolioUrl: text("portfolioUrl"),
  accountUrl: text("accountUrl"),
  wrongWithEvent: text("wrongWithEvent"),
  coldEmail: text("coldEmail"),
  room4y: text("room4y"),
  anything: text("anything"),
  referrer: text("referrer"),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
