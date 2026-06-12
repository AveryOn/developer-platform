import { articlesTable } from '~/server/database/schema/articles';

export type Article = typeof articlesTable.$inferSelect
