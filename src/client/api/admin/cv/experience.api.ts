import { httpClient } from '~/client/api/http-client'
import { _ } from '~/shared/const'
import type { Experience } from '~/shared/dto/cv/experience.dto'
import { AppRoutes } from '~/shared/router'

const routes = AppRoutes.api.admin

export const CvExperienceApi = {
  async getListByProfileId(profileId?: string) {
    const result = await httpClient.get<{ data: Experience[] }>(
      routes.CvExperiences,
      {
        params: profileId ? { profileId } : _,
      },
    )
    return result.data
  },
}
