import type { Article, ArticleCreateInput } from '~/shared/types'
import { articlesTable } from '~/server/database/schema'
import { db } from '~/server/database/client'

export const CvProfileService = {
  async getList(): Promise<Article[]> {
    return await db.select().from(articlesTable)
  },

  async create(data: ArticleCreateInput): Promise<Article> {
    const [article] = await db
      .insert(articlesTable)
      .values(data)
      .returning()
    return article
  },
}
