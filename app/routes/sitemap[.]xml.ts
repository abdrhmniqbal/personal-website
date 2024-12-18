import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap'
import { type Route } from './+types/sitemap[.]xml'
import { createDomain } from '@/lib/utils/http'

export type SitemapData = {}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const domain = createDomain(request)

  // @ts-expect-error - This import exists but is not picked up by the TypeScript compiler because it's a remix internal
  const { routes } = await import('virtual:react-router/server-build')

  const sitemap = await generateRemixSitemap({
    domain,
    routes,
    ignore: ['/resource/*', '/action/*'],
    urlTransformer: (url) => `${url}`,
  })

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
