import type { cvProfileTable } from '~/server/database/schema'

export type Profile = typeof cvProfileTable.$inferSelect
export type ProfileInput = typeof cvProfileTable.$inferInsert
