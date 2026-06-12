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

  // getById(uuid: string) {
  //   return httpClient.get<Profile[]>(`/cv/profiles/${uuid}`)
  // },

  // getActive() {
  //   return httpClient.get<Profile[]>('/cv/profiles', {
  //     params: {
  //       isActive: true,
  //     },
  //   })
  // },

  // create(data: CreateCvProfileDto) {
  //   return httpClient.post<Profile[]>(`/cv/profiles`, {
  //     data,
  //   })
  // },

  // update(uuid: string, data: UpdateCvProfileDto) {
  //   return httpClient.patch<Profile[]>(`/cv/profiles/${uuid}`, {
  //     data,
  //   })
  // },
}
