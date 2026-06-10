export enum ProfileLanguage {
  en = 'en',
  ru = 'ru',
  fr = 'fr',
}

export const ProfileLanguages = [
  ProfileLanguage.en,
  ProfileLanguage.fr,
  ProfileLanguage.ru,
] as const

export enum SocialNetwork {
  github = 'github',
  linkedin = 'linkedin',
  telegram = 'telegram',
  website = 'website',
  reddit = 'reddit',
  x = 'x',
  email = 'email',
  other = 'other',
  facebook = 'facebook',
  instagram = 'instagram',
}

export const SocialNetworks = [
  SocialNetwork.email,
  SocialNetwork.facebook,
  SocialNetwork.github,
  SocialNetwork.instagram,
  SocialNetwork.linkedin,
  SocialNetwork.reddit,
  SocialNetwork.telegram,
  SocialNetwork.website,
  SocialNetwork.x,
  SocialNetwork.other,
] as const

export enum CVEmploymentType {
  fullTime = 'full_time',
  partTime = 'part_time',
  contract = 'contract',
  freelance = 'freelance',
  internship = 'internship',
  selfEmployed = 'self_employed',
}

export enum CVTemplateStatus {
  draft = 'draft',
  active = 'active',
  archived = 'archived',
}

export const CVTemplateStatuses = [
  CVTemplateStatus.draft,
  CVTemplateStatus.active,
  CVTemplateStatus.archived,
] as const
