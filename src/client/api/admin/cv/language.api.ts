import { httpClient } from '~/client/api/http-client'
import type { Language } from '~/shared/dto/cv/language.dto'

export const CvLinksApi = {
  async getList() {
    const result = await httpClient.get<{ data: Language[] }>(
      `/cv/languages/`,
    )
    return result.data
  },
}
