import { httpClient } from '~/client/api/http-client'
import type { Link } from '~/shared/dto/cv/link.dto'
import { AppRoutes } from '~/shared/router'

const routes = AppRoutes.api.admin

export const CvLinksApi = {
  async getListByProfileId(profileId?: string) {
    const result = await httpClient.get<{ data: Link[] }>(
      routes.CvLinks,
      {
        params: {
          profileId,
        },
      },
    )
    return result.data
  },
}
