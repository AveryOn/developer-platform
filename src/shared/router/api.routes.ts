
export const apiRoutes = {
  Health: '/api/health',
  Projects: '/api/projects',
  Articles: '/api/articles',
  CvProfiles: '/api/cv/profiles',
  CvProfilesActive: '/api/cv/profiles/active',
  cvProfileByUuid: (uuid: string) => `/api/cv/profiles/${uuid}`,
}
