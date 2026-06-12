import { httpClient } from '~/client/api/http-client'
import type { Experience } from '~/shared/dto/cv/experience.dto'

export const CvProjectsApi = {
  async getList(profileId: string) {
    const result = await httpClient.get<{ data: Experience[] }>(`/cv/experience/`)
    return result.data
  },
}
