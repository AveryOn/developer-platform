import type { APIRoute } from 'astro'
import {
  Logger,
  type LoggerDetails,
} from '~/shared/logger/logger.client'
import { _ } from '~/shared/const'
import { CvLinkService } from '~/server/services/admin/cv/link.service'

export const GET: APIRoute = async () => {
  const logger = new Logger('HTTP:GET:Links.GET_LIST')
  try {
    // GET LIST
    logger.info('request links list')
    const links = await CvLinkService.getList()

    logger.info('GET: projects', { count: links.length })

    return Response.json({ data: links })
  } catch (err) {
    logger.error('ERROR', err as LoggerDetails)
    throw err
  }
}
