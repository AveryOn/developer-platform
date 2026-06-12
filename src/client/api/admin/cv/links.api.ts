import { httpClient } from '~/client/api/http-client'
import type { Profile } from '~/shared/dto/cv/profile.dto'

export const CvLinksApi = {
  async getListByProfileId(profileId: string) {
    const result = await httpClient.get<{ data: Profile[] }>(
      `/cv/links/`,
      {
        params: {
          profileId,
        },
      },
    )
    return result.data
  },
}
