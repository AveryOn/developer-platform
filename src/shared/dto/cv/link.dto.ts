import type { cvProfileLinkTable } from '~/server/database/schema'

export type Link = typeof cvProfileLinkTable.$inferSelect
export type LinkInput = typeof cvProfileLinkTable.$inferInsert
