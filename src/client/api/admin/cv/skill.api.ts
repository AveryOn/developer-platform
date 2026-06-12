import { httpClient } from '~/client/api/http-client'
import type { Skill } from '~/shared/dto/cv/skill.dto'

export const CvProjectsApi = {
  async getList() {
    const result = await httpClient.get<{ data: Skill[] }>(
      `/cv/skills`,
    )
    return result.data
  },
}
