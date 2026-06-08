import type { App } from 'vue'

import { i18n } from '~/client-plugins/i18n'
import pinia from '~/client/plugins/pinia'

export default async (app: App) => {
  app.use(i18n)
  // @ts-expect-error
  app.use(ProfeatUI, {
    fonts: false,
    theme: getTheme(product)
  })
  app.use(pinia)

  /** На основе куки lang выбираем языковую локаль */
  if (i18n.global.availableLocales.includes(currentLocale)) {
    // @ts-expect-error
    i18n.global.locale.value = currentLocale
  }
}
