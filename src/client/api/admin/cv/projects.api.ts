import { httpClient } from '~/client/api/http-client'
import type { Project } from '~/shared/dto/cv/projects.dto'

export const CvProjectsApi = {
  async getList() {
    const result = await httpClient.get<{ data: Project[] }>(
      `/cv/projects`,
    )
    return result.data
  },
}
