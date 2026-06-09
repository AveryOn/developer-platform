import type { Article } from '~/shared/types'
import { articlesTable } from '~/server/database/schema'
import { db } from '~/server/database/client'

export const ArticleService = {
  async getList(): Promise<Article[]> {
    return await db.select().from(articlesTable)
  },
}
