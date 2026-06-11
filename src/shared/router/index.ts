export enum AppClientRoutes {
  Home = '/',
  AboutMe = '/about-me',

  News = '/news',
  Projects = '/projects',
}

export const AppClientRouteBuilders = {
  newsDetails: (uuid: string) => `/news/${uuid}`,
  projectDetails: (uuid: string) => `/projects/${uuid}`,
} as const

export enum AppAdminRoutes {
  Admin = '/admin',

  AdminProjects = '/admin/projects',
  AdminSettings = '/admin/settings',

  AdminArticles = '/admin/articles',
  AdminArticlesNew = '/admin/articles/new',

  AdminCv = '/admin/cv',
  AdminCvEmploymentTypes = '/admin/cv/employment-types',
  AdminCvExperience = '/admin/cv/experience',
  AdminCvLanguages = '/admin/cv/languages',
  AdminCvLinks = '/admin/cv/links',
  AdminCvPreview = '/admin/cv/preview',
  AdminCvProfile = '/admin/cv/profile',
  AdminCvProfileNew = '/admin/cv/profile/new',
  AdminCvProjects = '/admin/cv/projects',
  AdminCvSkills = '/admin/cv/skills',
  AdminCvTemplates = '/admin/cv/templates',
  AdminCvVersions = '/admin/cv/versions',
}

export enum AppApiRoutes {
  Health = '/api/health',

  Projects = '/api/projects',

  Articles = '/api/articles',

  CvProfiles = '/api/cv/profiles',
  CvProfilesActive = '/api/cv/profiles/active',
}

export const AppApiRouteBuilders = {
  cvProfileByUuid: (uuid: string) => `/api/cv/profiles/${uuid}`,
} as const
