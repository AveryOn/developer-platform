import type { APIRoute } from 'astro'
import { HttpStatusCode } from 'axios'
import { eq } from 'drizzle-orm'
import { db } from '~/server/database/client'
import { cvProfileTable } from '~/server/database/schema/cv-profile'
import { _ } from '~/shared/const'
import { Logger } from '~/shared/logger/logger.client'

// Получить профиль по его ID
export const GET: APIRoute = async ({ params, url }) => {
  const logger = new Logger('HTTP:GET:PROFILE:GET_BY_ID')
  const uuid = params.uuid
  logger.info(_, { uuid, url })

  if (!uuid) {
    return Response.json(
      { error: 'Profile uuid is required' },
      { status: HttpStatusCode.BadRequest },
    )
  }

  const [profile] = await db
    .select()
    .from(cvProfileTable)
    .where(eq(cvProfileTable.id, uuid))

  if (!profile) {
    return Response.json({ error: 'Profile not found' }, { status: 404 })
  }

  return Response.json({ data: profile })
}

export const PATCH: APIRoute = async ({ params, request }) => {
  const uuid = params.uuid

  if (!uuid) {
    return Response.json(
      { error: 'Profile uuid is required' },
      { status: 400 },
    )
  }

  const body = await request.json()

  const [profile] = await db
    .update(cvProfileTable)
    .set({
      language: body.language,
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      location: body.location,
      summary: body.summary,
      email: body.email,
      phone: body.phone,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(cvProfileTable.id, uuid))
    .returning()

  if (!profile) {
    return Response.json({ error: 'Profile not found' }, { status: 404 })
  }

  return Response.json({ data: profile })
}

export const DELETE: APIRoute = async ({ params }) => {
  const uuid = params.uuid

  if (!uuid) {
    return Response.json(
      { error: 'Profile uuid is required' },
      { status: 400 },
    )
  }

  await db.delete(cvProfileTable).where(eq(cvProfileTable.id, uuid))

  return Response.json({ ok: true })
}
