import '@/assets/styles/app.css'
import '@/assets/styles/mdx.css'
import '@/assets/styles/themes.css'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { useNonce } from '@/lib/hooks/use-nonce'
import { ClientHintCheck, getHints } from '@/lib/utils/client-hints'
import { createDomain } from '@/lib/utils/http'
import { getTheme, type Theme } from '@/lib/utils/theme.server'
import { useOptionalTheme } from '@/routes/action.set-theme'
import MainLayout from '@/ui/layouts/main'
import { type Route } from './+types/root'

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
  return {
    APP_NAME: context.env.APP_NAME,
    requestInfo: {
      hints: getHints(request),
      origin: createDomain(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  }
}

function Document({
  children,
  nonce,
  theme = 'dark',
}: {
  children: React.ReactNode
  nonce: string
  theme?: Theme
}) {
  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ClientHintCheck nonce={nonce} />
        <Meta />
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

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useNonce()
  const theme = useOptionalTheme()
  return (
    <Document nonce={nonce} theme={theme}>
      {children}
    </Document>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <MainLayout userPreference={loaderData.requestInfo.userPrefs.theme}>
      <Outlet />
    </MainLayout>
  )
}
