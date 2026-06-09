import type { APIRoute } from 'astro'
import { z } from 'zod'

const createArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
})

export const prerender = false

export const GET: APIRoute = async () => {
  const articles = [
    {
      id: 'demo-id',
      slug: 'demo-slug',
      title: 'Demo title',
      content: '# Demo',
      createdAt: new Date().toISOString(),
    },
  ]

  return Response.json(articles)
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null)

  const parsed = createArticleSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      {
        message: 'Invalid request body',
        errors: z.treeifyError(parsed.error),
      },
      {
        status: 400,
      },
    )
  }

  const article = {
    id: crypto.randomUUID(),
    slug: parsed.data.slug,
    title: parsed.data.title,
    contentMd: parsed.data.content,
    createdAt: new Date().toISOString(),
  }

  return Response.json(article, {
    status: 201,
  })
}
