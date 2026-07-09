import { cvProfileLinkTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type { CreateCvLinkDto, Link } from '~/shared/dto/cv/link.dto'
import { and, eq } from 'drizzle-orm'
import { dateISO } from '~/shared/utils/datetime'
// import { dateISO } from '~/shared/utils/datetime'

export const CvLinkService = {
  async getList(): Promise<Link[]> {
    return await db.select().from(cvProfileLinkTable)
  },

  async create(dto: CreateCvLinkDto): Promise<Link> {
    return await db.transaction(async (tx) => {
      const now = dateISO()

      const [existingLink] = await tx
        .select()
        .from(cvProfileLinkTable)
        .where(
          and(
            eq(cvProfileLinkTable.profileId, dto.profileId),
            eq(cvProfileLinkTable.label, dto.label)
          )
        )
        .limit(1)

      // Если такая ссылка уже существует для этого профиля
      if (existingLink) {
        throw new Error('Conflict', { cause: 'Such a link already exists' })
      }

      const linksOnProfile = await tx
        .select({
          order: cvProfileLinkTable.order,
          id: cvProfileLinkTable.id,
        })
        .from(cvProfileLinkTable)
        .where(
          eq(cvProfileLinkTable.profileId, dto.profileId),
        )

      const shiftedOrderLinks = linksOnProfile.map((link) => {
        link.order += 1
        return link
      })

      // Фиксирование индексов порядка для всех остальных link в профиле
      await Promise.all(shiftedOrderLinks.map(async (link) => {
        const [data] = await tx
          .update(cvProfileLinkTable)
          .set({
            order: link.order
          })
          .where(
            eq(cvProfileLinkTable.id, link.id)
          )
          .returning({
            id: cvProfileLinkTable.id,
            order: cvProfileLinkTable.order,
          })
          .limit(1)
        return data
      }))


      const [newLink] = await tx
        .insert(cvProfileLinkTable)
        .values({
          label: dto.label,
          profileId: dto.profileId,
          type: dto.type,
          url: dto.url,
          order: 0,
          isVisible: true,
          updatedAt: now,
          createdAt: now,
        })
        .returning()

      return newLink
    })
  },
}
