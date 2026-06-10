import { cvProfileTable } from '~/server/database/schema'
import { db } from '~/server/database/client'
import type {
  Profile,
  ProfileInput,
} from '~/shared/types/cv/profile.type'
import { eq } from 'drizzle-orm'

export const CvProfileService = {
  async getList(): Promise<Profile[]> {
    return await db.select().from(cvProfileTable)
  },

  async create(data: ProfileInput): Promise<Profile> {
    const [profile] = await db
      .insert(cvProfileTable)
      .values(data)
      .returning()
    return profile
  },

  async getActive(): Promise<Profile | null> {
    const [profile] = await db
      .select()
      .from(cvProfileTable)
      .where(eq(cvProfileTable.isActive, true))

    return profile ?? null
  },
}
