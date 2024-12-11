import '@/assets/styles/app.css'
import '@/assets/styles/mdx.css'
import '@/assets/styles/themes.css'
import { useNonce } from '@/lib/hooks/use-nonce'
import { themeSessionResolver } from '@/sessions.server'
import MainLayout from '@/ui/layouts/main'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import type { Route } from './+types/root'

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.APP_NAME },
    {
      name: 'description',
      content: `Web developer residing in Bandung, passionate about crafting
        intuitive, user-friendly, and performant web applications.`,
    },
  ]
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export async function loader({ context, request }: Route.LoaderArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    APP_NAME: context.env.APP_NAME,
    theme: getTheme(),
  }
}

export function AppLayout({
  children,
  loaderData,
}: {
  children: React.ReactNode
  loaderData: Route.ComponentProps['loaderData']
}) {
  const [theme] = useTheme()
  const nonce = useNonce()
  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(loaderData.theme)} nonce={nonce} />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}

export default function AppWithProvider({ loaderData }: Route.ComponentProps) {
  const { theme } = loaderData
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <AppLayout loaderData={loaderData}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AppLayout>
    </ThemeProvider>
  )
}
