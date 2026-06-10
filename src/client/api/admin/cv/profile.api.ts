import { httpClient } from '~/client/api/http-client'
import type { Profile } from '~/shared/types/cv/profile.type'

export const CvProfileApi = {
  getAll() {
    return httpClient.get<Profile[]>('/cv/profiles')
  },
}
