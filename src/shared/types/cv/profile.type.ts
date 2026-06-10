import type { cvProfileTable } from '~/server/database/schema'

export type Article = typeof cvProfileTable.$inferSelect
export type ArticleCreateInput = typeof cvProfileTable.$inferInsert
