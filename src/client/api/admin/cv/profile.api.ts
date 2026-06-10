import { httpClient } from '~/client/api/http-client'
import type { CreateCvProfileDto, Profile } from '~/shared/dto/admin/cv/profile.dto'

export const CvProfileApi = {
  async getAll() {
    const result = await httpClient.get<{ data: Profile[] }>('/cv/profiles')
    return result.data
  },

  getById(uuid: string) {
    return httpClient.get<Profile[]>(`/cv/profiles/${uuid}`)
  },

  getActive() {
    return httpClient.get<Profile[]>('/cv/profiles', {
      params: {
        isActive: true
      },
    })
  },

  create(data: CreateCvProfileDto) {
    return httpClient.post<Profile[]>(`/cv/profiles`, {
      data
    })
  },
}
