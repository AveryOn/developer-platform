import { httpClient } from '~/client/api/http-client'
import type { Template } from '~/shared/dto/cv/template.dto'

export const CvTemplateApi = {
  async getList() {
    const result = await httpClient.get<{ data: Template[] }>(
      `/cv/templates`,
    )
    return result.data
  },
}
