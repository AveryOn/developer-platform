import type { cvExperienceTable } from '~/server/database/schema'

export type Experience = typeof cvExperienceTable.$inferSelect
