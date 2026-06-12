import { httpClient } from '~/client/api/http-client'
import type { Experience } from '~/shared/dto/cv/experience.dto'
import { AppRoutes } from '~/shared/router'

const routes = AppRoutes.api.admin

export const CvExperienceApi = {
  async getList() {
    const result = await httpClient.get<{ data: Experience[] }>(
      routes.CvExperiences,
    )
    return result.data
  },
}
