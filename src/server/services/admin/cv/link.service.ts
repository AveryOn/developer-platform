import { cvProfileLinkTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type { CreateCvLinkDto, CreateLinkResponse, Link } from '~/shared/dto/cv/link.dto'
import { and, eq } from 'drizzle-orm'
import { dateISO } from '~/shared/utils/datetime'
import type { Logger } from '~/shared/logger/logger.client'
// import { dateISO } from '~/shared/utils/datetime'

export const CvLinkService = {
  async getList(): Promise<Link[]> {
    return await db.select().from(cvProfileLinkTable)
  },

  async create(dto: CreateCvLinkDto, logger?: Logger): Promise<CreateLinkResponse> {
    return await db.transaction(async (tx) => {
      const now = dateISO()

      logger?.info('TRANSACTION', { now })
      logger?.info('Conflict Row Check')

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
        logger?.error('[CONFLICT] Such a link already exists', {
          profileId: existingLink.profileId,
          label: existingLink.label
        })
        throw new Error('Conflict', { cause: 'Such a link already exists' })
      }

      logger?.info(`Get list by Profile ${dto.profileId}:: PENDING`)

      const linksOnProfile = await tx
        .select({
          order: cvProfileLinkTable.order,
          id: cvProfileLinkTable.id,
        })
        .from(cvProfileLinkTable)
        .where(
          eq(cvProfileLinkTable.profileId, dto.profileId),
        )

      logger?.info(`Get list by Profile ${dto.profileId}:: COMPLETE`, { count: linksOnProfile.length })


      logger?.info('Reorder links:: PENDING')
      const shiftedLinks = linksOnProfile.map((link) => {
        link.order += 1
        return link
      })
      logger?.info('Reorder links:: COMPLETE', { shiftedLinks })

      // Фиксирование индексов порядка для всех остальных link в профиле
      await Promise.all(shiftedLinks.map(async (link) => {
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


      // const [newLink] = await tx
      //   .insert(cvProfileLinkTable)
      //   .values({
      //     label: dto.label,
      //     profileId: dto.profileId,
      //     type: dto.type,
      //     url: dto.url,
      //     order: 0,
      //     isVisible: true,
      //     updatedAt: now,
      //     createdAt: now,
      //   })
      //   .returning()

      // return {
      //   newLink,
      //   shiftedLinks: shiftedLinks
      // }
      throw ''
    })
  },
}
