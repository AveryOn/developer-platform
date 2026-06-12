export const apiRoutes = {
  client: {
    Health: '/api/health',
    Projects: '/api/projects',
    Articles: '/api/articles',
  },

  admin: {
    CvProfiles: '/api/cv/profiles',
    CvProfilesActive: '/api/cv/profiles/active',
    cvProfileByUuid: (uuid: string) => `/api/cv/profiles/${uuid}`,
  },
} as const
