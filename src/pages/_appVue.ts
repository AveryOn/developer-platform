import type { App } from 'vue'

import pinia from '~/client/plugins/pinia'

export default async (app: App) => {
  app.use(pinia)
}
