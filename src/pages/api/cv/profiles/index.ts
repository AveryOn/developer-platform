import type { APIRoute } from 'astro'
import { db } from '~/server/database/client'
import { cvProfileTable } from '~/server/database/schema/cv-profile'
import { CvProfileService } from '~/server/services/admin/cv/profile.service'
import { Logger, type LoggerDetails } from '~/shared/logger/logger.client'

export const GET: APIRoute = async () => {
  const logger = new Logger('Get.profile.list')
  try {
    const profiles = await CvProfileService.getList()

    logger.info('GET: profiles', { count: profiles.length })

    return Response.json({ data: profiles })
  } catch (err) {
    logger.error('ERROR', err as LoggerDetails)
    throw err
  }

}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  const [profile] = await db
    .insert(cvProfileTable)
    .values({
      language: body.language,
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      location: body.location,
      summary: body.summary,
      email: body.email,
      phone: body.phone,
    })
    .returning()

  return Response.json({ data: profile }, { status: 201 })
}
