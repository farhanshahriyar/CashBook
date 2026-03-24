import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const savingGoalsTable = pgTable("saving_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  targetAmount: numeric("target_amount", { precision: 12, scale: 2 }).notNull(),
  savedAmount: numeric("saved_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  deadline: timestamp("deadline", { withTimezone: true }).notNull(),
  emoji: text("emoji").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSavingGoalSchema = createInsertSchema(savingGoalsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSavingGoal = z.infer<typeof insertSavingGoalSchema>;
export type SavingGoal = typeof savingGoalsTable.$inferSelect;
