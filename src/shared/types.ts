import type { articlesTable } from '~/server/database/schema'

export type Article = typeof articlesTable.$inferSelect
export type ArticleCreateInput = typeof articlesTable.$inferInsert

export enum ProfileLanguage {
  en = 'en',
  ru = 'ru',
  fr = 'fr',
}
