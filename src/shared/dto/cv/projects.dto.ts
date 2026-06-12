import type { cvProjectTable } from "~/server/database/schema";

export type Project = typeof cvProjectTable.$inferSelect
