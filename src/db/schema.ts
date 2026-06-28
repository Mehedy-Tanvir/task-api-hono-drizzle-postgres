import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const taskTable = pgTable("task", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  done: boolean().default(false).notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull().$onUpdate(() => new Date()),
});

export const selectTaskSchema = createSelectSchema(taskTable);
export const insertSchema = createInsertSchema(taskTable).omit({ id: true, createdAt: true, updatedAt: true });
