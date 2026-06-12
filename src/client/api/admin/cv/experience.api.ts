import { httpClient } from '~/client/api/http-client'
import type { Experience } from '~/shared/dto/cv/experience.dto'

export const CvLinksApi = {
  async getList() {
    const result = await httpClient.get<{ data: Experience[] }>(
      `/cv/experiences/`,
    )
    return result.data
  },
}
