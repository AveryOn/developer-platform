
export const adminRoutes = {
  // ENTRY
  index: '/admin',
  // ---

  // CV
  Cv: '/admin/cv',
  // ---

  // EXPERIENCE
  CvExperience: '/admin/cv/experience',
  // ---

  // LANGUAGES
  CvLanguages: '/admin/cv/languages',
  // ---

  // PREVIEW
  CvPreview: '/admin/cv/preview',
  // ---

  // PROFILE
  CvProfile: '/admin/cv/profile',
  CvProfileById: (uuid: string) => `/admin/cv/profile/${uuid}`,
  CvProfileNew: '/admin/cv/profile/new',
  // ---

  // SKILLS
  CvSkills: '/admin/cv/skills',
  // ---

  // TEMPLATES
  CvTemplates: '/admin/cv/templates',
  // ---

  // VERSIONS
  CvVersions: '/admin/cv/versions',
  // ---

  // EMPLOYMENT TYPES
  CvEmploymentTypes: '/admin/cv/employment-types',
  // ---

  // ARTICLES
  Articles: '/admin/articles',
  ArticlesNew: '/admin/articles/new',
  // ---

  // SETTINGS
  Settings: '/admin/settings',
  // ---

  // PROJECTS
  Projects: '/admin/projects',
  CvProjects: '/admin/cv/projects',
  // ---

  // LINKS
  CvLinks: '/admin/cv/links',
  // ---
}
