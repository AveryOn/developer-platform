import type { APIRoute } from 'astro'
import { desc } from 'drizzle-orm'
import { db } from '~/server/database/client'
import { cvProfileTable } from '~/server/database/schema/cv-profile'
import { Logger } from '~/shared/logger/logger.client'

export const GET: APIRoute = async ({ url }) => {
  const profiles = await db
    .select()
    .from(cvProfileTable)
    .orderBy(desc(cvProfileTable.createdAt))

  new Logger({ url }, 'Get.profile.list').warn('ЗАПРОС ПРОФИЛЕЙ')

  return Response.json({ data: profiles })
}

// export const POST: APIRoute = async ({ request }) => {
//   const body = await request.json()

//   const [profile] = await db
//     .insert(cvProfileTable)
//     .values({
//       language: body.language,
//       firstName: body.firstName,
//       lastName: body.lastName,
//       title: body.title,
//       location: body.location,
//       summary: body.summary,
//       email: body.email,
//       phone: body.phone,
//     })
//     .returning()

//   return Response.json({ data: profile }, { status: 201 })
// }
