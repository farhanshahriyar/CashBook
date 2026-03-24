import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const budgetsTable = pgTable("budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: text("category").notNull().unique(),
  limitAmount: numeric("limit_amount", { precision: 12, scale: 2 }).notNull(),
  spent: numeric("spent", { precision: 12, scale: 2 }).notNull().default("0"),
  color: text("color").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBudgetSchema = createInsertSchema(budgetsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBudget = z.infer<typeof insertBudgetSchema>;
export type Budget = typeof budgetsTable.$inferSelect;
