import { cvProfileLinkTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type { CreateCvLinkDto, Link } from '~/shared/dto/cv/link.dto'
import { dateISO } from '~/shared/utils/datetime'

export const CvLinkService = {
  async getList(): Promise<Link[]> {
    return await db.select().from(cvProfileLinkTable)
  },

  async create(dto: CreateCvLinkDto): Promise<Link> {
    const now = dateISO()
    const [link] = await db
      .insert(cvProfileLinkTable)
      .values({
        label: dto.label,
        type: dto.type,
        url: dto.url,
        isVisible: dto.isVisible,
        order: dto.order,
        profileId: dto.profileId,
        createdAt: now,
        updatedAt: now,
      })
      .returning()
    return link
  },
}
