import { httpClient } from '~/client/api/http-client'
import type { EmploymentType } from '~/shared/dto/cv/employment-type.dto'

export const CvEmploymentTypeApi = {
  async getList() {
    const result = await httpClient.get<{ data: EmploymentType[] }>(
      `/cv/employment-type`,
    )
    return result.data
  },
}
