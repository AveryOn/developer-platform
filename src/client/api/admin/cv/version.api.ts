import { httpClient } from '~/client/api/http-client'
import type { Version } from '~/shared/dto/cv/version.dto'

export const CvVersionApi = {
  async getList() {
    const result = await httpClient.get<{ data: Version[] }>(
      `/cv/versions`,
    )
    return result.data
  },
}
