import { cvExperienceTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type { Experience } from '~/shared/dto/cv/experience.dto'

export const CvExperienceService = {
  async getList(): Promise<Experience[]> {
    return await db.select().from(cvExperienceTable)
  },
}
