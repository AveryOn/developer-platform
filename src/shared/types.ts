import type { articlesTable } from '~/server/database/schema'

export type Article = typeof articlesTable.$inferSelect
export type ArticleCreateInput = typeof articlesTable.$inferInsert

export enum ProfileLanguage {
  en = 'en',
  ru = 'ru',
  fr = 'fr',
}

export enum SocialNetwork {
  github = 'github',
  linkedin = 'linkedin',
  telegram = 'telegram',
  website = 'website',
  reddit = 'reddit',
  x = 'x',
  email = 'email',
  other = 'other',
  facebook = 'facebook',
  instagram = 'instagram'
}
