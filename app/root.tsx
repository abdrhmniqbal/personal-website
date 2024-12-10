import '@/assets/styles/app.css'
import '@/assets/styles/mdx.css'
import '@/assets/styles/themes.css'
import { useNonce } from '@/lib/hooks/use-nonce'
import MainLayout from '@/ui/layouts/main'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.APP_NAME },
    { name: 'description', content: `Web developer residing in Bandung, passionate about crafting
        intuitive, user-friendly, and performant web applications.` },
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

export function loader({ context }: Route.LoaderArgs) {
  return {
    APP_NAME: context.env.APP_NAME,
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const nonce = useNonce()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
