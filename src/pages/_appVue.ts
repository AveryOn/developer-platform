import type { App } from 'vue'
import '~/client/styles/normalize.css'
import { i18n } from '~/client/plugins/i18n'
import pinia from '~/client/plugins/pinia'

export default async (app: App) => {
  app.use(i18n)
  app.use(pinia)
}
