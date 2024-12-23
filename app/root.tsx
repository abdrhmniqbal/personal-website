import '@/assets/styles/app.css'
import '@/assets/styles/mdx.css'
import '@/assets/styles/themes.css'
import { generateMeta } from '@forge42/seo-tools/remix/metadata'
import { article } from '@forge42/seo-tools/structured-data/article'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router'
import { useNonce } from '@/lib/hooks/use-nonce'
import { ClientHintCheck, getHints } from '@/lib/utils/client-hints'
import { cn } from '@/lib/utils/css'
import { createDomain } from '@/lib/utils/http'
import { getTheme, type Theme } from '@/lib/utils/theme.server'
import { useOptionalTheme } from '@/routes/resource.set-theme'
import { buttonStyles } from '@/ui/components/button'
import MainLayout from '@/ui/layouts/main'
import { type Route } from './+types/root'

export function meta({ data }: Route.MetaArgs) {
  const meta = generateMeta(
    {
      title: data ? data.APP_NAME : 'Error | Iqbal Abdurrahman',
      description: `Web developer residing in Bandung, passionate about crafting
        intuitive, user-friendly, and performant web applications.`,
      url: data ? `${data.requestInfo.origin}${data.requestInfo.path}` : '/',
    },
    [
      {
        'script:ld+json': article({
          '@type': 'Article',
          headline: data ? data.APP_NAME : 'Error | Iqbal Abdurrahman',
          image: data
            ? `${data.requestInfo.origin}/resource/og?title=${data.APP_NAME}`
            : null,
        }),
      },
    ],
  )

  return meta
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const getClientErrorDetails = (
    status: number,
  ): { text: string; message: string } => {
    const clientErrorMessages: Record<
      number,
      { text: string; message: string }
    > = {
      400: {
        text: 'Bad Request',
        message: 'The server could not understand the request.',
      },
      401: {
        text: 'Unauthorized',
        message: 'You need to log in to access this page.',
      },
      403: {
        text: 'Forbidden',
        message: "You don't have permission to access this resource.",
      },
      404: {
        text: 'Not Found',
        message: "The page you're looking for doesn't exist.",
      },
      405: {
        text: 'Method Not Allowed',
        message: 'The method specified in the request is not allowed.',
      },
      408: {
        text: 'Request Timeout',
        message: 'The server timed out waiting for the request.',
      },
      429: {
        text: 'Too Many Requests',
        message: 'You have sent too many requests in a short period.',
      },
    }

    return (
      clientErrorMessages[status] || {
        text: 'Client Error',
        message: 'An unexpected client error occurred. Please try again later.',
      }
    )
  }

  // Function to render content based on the error type
  const renderContent = () => {
    if (isRouteErrorResponse(error)) {
      const isClientError = error.status >= 400 && error.status < 500

      if (isClientError) {
        const { text, message } = getClientErrorDetails(error.status)

        return (
          <>
            <h1 className="text-4xl font-semibold leading-10 tracking-tighter">
              {error.status} - {text}
            </h1>
            <p className="text-muted-foreground text-sm">{message}</p>
          </>
        )
      }

      return (
        <>
          <h1 className="text-4xl font-semibold leading-10 tracking-tighter">
            {error.status} - {error.statusText}
          </h1>
          <p className="text-muted-foreground text-sm">{error.data}</p>
        </>
      )
    } else if (error instanceof Error) {
      return (
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      )
    } else {
      return (
        <>
          <h1 className="text-4xl font-semibold">Unknown Error</h1>
        </>
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      {renderContent()}
      <Link
        to="/"
        className={cn(
          buttonStyles({ appearance: 'outline', size: 'sm' }),
          'mt-2',
        )}
      >
        Back to Homepage
      </Link>
    </div>
  )
}
