import type { Theme } from '~/client/types/app.types'
import { defineStore } from 'pinia'
import { themes } from '~/client/config/const'
import { CookieKey } from '~/shared/const'

export const appStore = defineStore('APP_STORE', () => {
  function setCookie(name: string, value: string, days = 365) {
    const maxAge = days * 24 * 60 * 60

    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
  }

  function getCookie(name: string) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1]
  }

  function applyTheme(theme: Theme) {
    document.documentElement.classList.remove(...themes)
    document.documentElement.classList.add(theme)

    setCookie(CookieKey.APP_THEME, theme)
  }

  function initTheme() {
    const themeFromCookie = getCookie(CookieKey.APP_THEME)

    if (themes.includes(themeFromCookie as Theme)) {
      applyTheme(themeFromCookie as Theme)
      return
    }

    applyTheme('app-theme-package-1')
  }

  initTheme()

  document
    .querySelector('[data-theme="1"]')
    ?.addEventListener('click', () => {
      applyTheme('app-theme-package-1')
    })

  document
    .querySelector('[data-theme="2"]')
    ?.addEventListener('click', () => {
      applyTheme('app-theme-package-2')
    })

  return {
    setCookie,
    getCookie,
    initTheme,
  }
})
