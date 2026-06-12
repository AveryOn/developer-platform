import { cvProfileLinkTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type { Link } from '~/shared/dto/cv/link.dto'

export const CvLinkService = {
  async getList(): Promise<Link[]> {
    return await db.select().from(cvProfileLinkTable)
  },
}
