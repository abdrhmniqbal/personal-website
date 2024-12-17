import { generateRobotsTxt } from '@forge42/seo-tools/robots'
import { createDomain } from '@/lib/utils/http'
import { type Route } from './+types/robots[.]txt'

export async function loader({ request, context }: Route.LoaderArgs) {
  const { env } = context
  const isProductionDeployment = env.APP_MODE === 'production'
  const domain = createDomain(request)
  const robotsTxt = generateRobotsTxt([
    {
      userAgent: '*',
      [isProductionDeployment ? 'allow' : 'disallow']: ['/'],
      sitemap: [`${domain}/sitemap.xml`],
    },
  ])
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
