import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const taskTable = pgTable("task", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  done: boolean().default(false).notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull().$onUpdate(() => new Date()),
});
