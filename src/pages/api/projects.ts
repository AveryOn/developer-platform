import type { APIRoute } from 'astro'
import { db } from '~/server/database/client'
import { projectsTable } from '~/server/database/schema'

export const GET: APIRoute = async () => {
  const data = await db.select().from(projectsTable)

  return Response.json(data)
}
