/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * Расширение клиентского контекста через глобальное объявление
 * Документация: https://docs.astro.build/en/guides/middleware/#example-redacting-sensitive-information
 */
import type { LocaleI18n } from '~/utils/astro-i18n'
import type { FaviconMapByProduct } from '~/utils/redirect'

interface ImportMetaEnv {
  // app/variables
  readonly APP_HOST: string
  readonly BASE_URL_HOST?: string
  readonly FRONTEND_API_URL?: string
  readonly BACKEND_URL: string
  readonly PUBLIC_APPS_SHARED_HOST: 'localhost' | '.yourgood.app'
  readonly PUBLIC_APP_ENVIRONMENT:
    | 'local'
    | 'dev'
    | 'stage'
    | 'canary'
    | 'prod'
    | 'test'
  readonly ENABLE_SCALAR_API_DOCS: 'true' | 'false'
  readonly LOG_LEVEL:
    | 'fatal'
    | 'error'
    | 'warn'
    | 'info'
    | 'debug'
    | 'trace'
    | 'silent'

  readonly X_SECRET_TOKEN: string
  readonly CORS_ORIGINS: string

  readonly ACCESS_COOKIE_NAME:
    | 'accessToken'
    | 'canaryAccessToken'
    | 'devAccessToken'
    | 'stageAccessToken'
  readonly REFRESH_COOKIE_NAME:
    | 'refreshToken'
    | 'canaryRefreshToken'
    | 'devRefreshToken'
    | 'stageRefreshToken'
  readonly JWT_ACCESS_TOKEN_TTL: string
  readonly JWT_REFRESH_TOKEN_TTL: string
  readonly JWT_ACCESS_SALT: string

  readonly ENABLE_META_PIXEL: 'true' | 'false'
  readonly PUBLIC_ENABLE_YA_METRIKA: 'true' | 'false'
  readonly ENABLE_WELCOME_ZONE: 'true' | 'false'
  readonly WEBHOOK_AFTER_REGISTER_TO_PF: string

  // ya-debug-metrika/variables
  readonly DEVELOPER_YA_ID?: string

  // AWS/access
  readonly AWS_ENDPOINT: string
  readonly AWS_BUCKET_NAME: string

  // analytics/variables
  readonly PUBLIC_ANALYTIC_BACKEND_URL: string
  readonly PUBLIC_ANALYTIC_X_SIGNATURE: string
  readonly TMP_COOKIE_NAME: string
  readonly TMP_USER_COOKIE_TTL: string

  // redis/variables
  readonly REDIS_HOST: string
  readonly REDIS_PORT: string
  readonly REDIS_PASSWORD?: string
  readonly REDIS_DB?: string
  readonly REDIS_KEY_PREFIX?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export interface Favicons {
  apple: string
  png96: string
  svg: string
  ico: string
}

declare global {
  namespace App {
    interface Locals {
      provider: Provider
      lang: LocaleI18n
      favicon: string
      favicons: Favicons
      title: string
      description: string
      faviconMapByProduct: typeof FaviconMapByProduct
      stepEmailRegister: true
    }
  }
}
