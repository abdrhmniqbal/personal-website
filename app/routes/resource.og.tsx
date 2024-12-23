import { createDomain } from '@/lib/utils/http'
import { createOGImage } from '@/lib/utils/og-image.server'
import { type Route } from './+types/resource.og'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url)
  const domain = createDomain(request)
  const title = searchParams.get('title') ?? `Iqbal Abdurrahman`

  const png = await createOGImage(title, domain)

  // Respond with the PNG buffer
  return new Response(png, {
    status: 200,
    headers: {
      // Tell the browser the response is an image
      'Content-Type': 'image/png',
      // Tip: You might want to heavily cache the response in production
      // 'cache-control': 'public, immutable, no-transform, max-age=31536000',
    },
  })
}
