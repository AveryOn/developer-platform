import { httpClient } from '~/client/api/http-client'

export type Article = {
  id: string
  slug: string
  title: string
  contentMd: string
  createdAt: string
}

export type CreateArticleDto = {
  slug: string
  title: string
  contentMd: string
}

export const articlesApi = {
  getAll() {
    return httpClient.get<Article[]>('/articles')
  },

  getBySlug(slug: string) {
    return httpClient.get<Article>(`/articles/${slug}`)
  },

  create(dto: CreateArticleDto) {
    return httpClient.post<Article, CreateArticleDto>('/articles', dto)
  },

  update(id: string, dto: Partial<CreateArticleDto>) {
    return httpClient.patch<Article, Partial<CreateArticleDto>>(
      `/articles/${id}`,
      dto,
    )
  },

  delete(id: string) {
    return httpClient.delete<void>(`/articles/${id}`)
  },
}
