import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap'
import { createDomain } from '@/lib/utils/http'
import { type Route } from './+types/sitemap[.]xml'

export const loader = async ({ request }: Route.LoaderArgs) => {
  const domain = createDomain(request)

  // @ts-expect-error - This import exists but is not picked up by the typescript compiler because it's a remix internal
  const { routes } = await import('virtual:react-router/server-build')

  const sitemap = await generateRemixSitemap({
    domain,
    routes,
    ignore: ['/resource/*', '/action/*', '/post/*'],
    // Transforms the url before adding it to the sitemap
    urlTransformer: (url) => `${url}`,
  })

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}