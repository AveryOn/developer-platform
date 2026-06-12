import type { APIRoute } from 'astro'
import {
  Logger,
  type LoggerDetails,
} from '~/shared/logger/logger.client'
import { _ } from '~/shared/const'
import { CvExperienceService } from '~/server/services/admin/cv/experience.service'

export const GET: APIRoute = async () => {
  const logger = new Logger('HTTP:GET:Experience.GET_LIST')
  try {
    // GET LIST
    logger.info('request experience list')
    const experiences = await CvExperienceService.getList()

    logger.info('GET: experience', { count: experiences.length })

    return Response.json({ data: experiences })
  } catch (err) {
    logger.error('ERROR', err as LoggerDetails)
    throw err
  }
}
