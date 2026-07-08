import { httpClient } from '~/client/api/http-client'
import { _ } from '~/shared/const'
import type { CreateCvLinkDto, Link } from '~/shared/dto/cv/link.dto'
import { AppRoutes } from '~/shared/router'

const routes = AppRoutes.api.admin

export const CvLinksApi = {
  async getListByProfileId(profileId?: string) {
    const result = await httpClient.get<{ data: Link[] }>(
      routes.CvLinks,
      {
        params: profileId ? { profileId } : _,
      },
    )
    return result.data
  },

  create(data: CreateCvLinkDto) {
    return httpClient.post<Link>(routes.CvLinks, {
      data,
    })
  },

}
