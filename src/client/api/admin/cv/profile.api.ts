import { httpClient } from '~/client/api/http-client'
import type { CreateCvProfileDto, Profile } from '~/shared/dto/admin/cv/profile.dto'

export const CvProfileApi = {
  getAll() {
    return httpClient.get<Profile[]>('/cv/profiles')
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
    return httpClient.get<Profile[]>(`/cv/profiles/`, {
      data
    })
  },
}
