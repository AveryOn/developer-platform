import type { APIRoute } from 'astro'
import { eq } from 'drizzle-orm'
import { db } from '~/server/database/client'
import { cvProfileTable } from '~/server/database/schema/cv-profile'

export const GET: APIRoute = async () => {
  const [profile] = await db
    .select()
    .from(cvProfileTable)
    .where(eq(cvProfileTable.isActive, true))

  return Response.json({ data: profile ?? null })
}

export const PATCH: APIRoute = async ({ request }) => {
  const body = await request.json()

  if (!body.profileId) {
    return Response.json(
      { error: 'profileId is required' },
      { status: 400 },
    )
  }

  const profile = await db.transaction(async (tx) => {
    await tx.update(cvProfileTable).set({
      isActive: false,
      updatedAt: new Date().toISOString(),
    })

    const [updated] = await tx
      .update(cvProfileTable)
      .set({
        isActive: true,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(cvProfileTable.id, body.profileId))
      .returning()

    return updated
  })

  if (!profile) {
    return Response.json({ error: 'Profile not found' }, { status: 404 })
  }

  return Response.json({ data: profile })
}
