import { env } from 'node:process'
import { createCookieSessionStorage } from 'react-router'
import { createThemeSessionResolver } from 'remix-themes'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    // Set domain and secure only if in production
    ...(env.APP_MODE === 'production'
      ? { domain: env.APP_URL, secure: true }
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
