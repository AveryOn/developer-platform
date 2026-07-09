import type { APIRoute } from "astro"
import z from "zod"
import { patchCvLinkDto } from "~/shared/dto/cv/link.dto"
import { Logger } from "~/shared/logger/logger.client"


export const PATCH: APIRoute = async ({ params, request }) => {
  const logger = new Logger('HTTP:PATCH:UPDATE_PROFILE_LINK')
  try {
    const uuid = params.uuid

    if (!z.uuid().safeParse(uuid).success) {
      return Response.json(
        { error: 'Profile uuid is required' },
        { status: 400 },
      )
    }

    const body = await request.json()
    logger.info('Excludes request body', { body })

    const { success, data, error } = patchCvLinkDto.safeParse(
      body?.data,
    )

    if (!success) {
      logger.error(_, { error })
      return Response.json(
        { error: ZodBundleErrors(error) },
        { status: 400 },
      )
    }

    const profile = await CvProfileService.getById(uuid)
    if (!profile) {
      return Response.json(
        { error: 'Profile not found' },
        { status: 404 },
      )
    }

    const updatedProfile = await CvProfileService.update(uuid, data)

    return Response.json({ data: updatedProfile })
  } catch (err) {
    logger.error(_, { err })
    throw err
  }
}
