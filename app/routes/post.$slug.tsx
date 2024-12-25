import { type SitemapHandle } from '@forge42/seo-tools/remix/sitemap'
import { ArrowLeft01Icon } from 'hugeicons-react'
import { Link, useViewTransitionState } from 'react-router'
import { posts } from '@/contents/generated'
import { formatDate } from '@/lib/utils/date'
import { toTitleCase } from '@/lib/utils/string'
import { type SitemapData } from '@/routes/sitemap[.]xml'
import { badgeStyles } from '@/ui/components/badge'
import { buttonStyles } from '@/ui/components/button'
import { ClientOnly } from '@/ui/components/client-only'
import { Container } from '@/ui/components/container'
import { Heading } from '@/ui/components/heading'
import { Image } from '@/ui/components/image'
import { Mdx } from '@/ui/components/mdx/component'
import { type Route } from './+types/post.$slug'

export const handle: SitemapHandle<SitemapData> = {
  sitemap: async (domain) => {
    const { posts } = await import('@/contents/generated')
    return posts.map((post) => ({
      route: `${domain}/post/${post.slugAsParams}`,
      priority: 1.0,
      lastmodISO: post.createdAt,
    }))
  },
}

async function getPageFromParams(params: string) {
  const post = posts.find((post) => post.slugAsParams === params)

  if (!post) {
    null
  }

  return post
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.post.title },
    { name: 'description', content: data.post.summary },
  ]
}

export async function loader({ params, context }: Route.LoaderArgs) {
  const post = await getPageFromParams(params.slug ? params.slug : '')
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }
  return {
    post,
    APP_NAME: context.env.APP_NAME,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData
  const href = `/posts`
  const isTransitioning = useViewTransitionState(href)
  return (
    <Container className="max-w-3xl pt-6 pb-[12vh] lg:max-w-3xl lg:pt-12 xl:max-w-4xl 2xl:max-w-4xl">
      <Link
        to={href}
        className={buttonStyles({ appearance: 'outline' })}
        viewTransition
      >
        <ArrowLeft01Icon data-slot="icon" strokeWidth={2} />
        See all posts
      </Link>
      <div className="mt-6 mb-4 flex flex-col">
        <div className="text-muted-fg space-x-2 text-sm">
          <time>
            Published on{' '}
            <span
              style={{
                viewTransitionName: isTransitioning ? 'post-date' : 'none',
              }}
            >
              {formatDate(post.createdAt)}
            </span>
          </time>
          <span>•</span>
          <span
            style={{
              viewTransitionName: isTransitioning
                ? 'post-reading-time'
                : 'none',
            }}
          >
            {post.metadata.readingTime} min read
          </span>
        </div>
        <Heading
          level={1}
          className="mt-2 inline-block text-3xl leading-tight font-semibold lg:text-4xl"
          style={{
            viewTransitionName: isTransitioning ? 'post-title' : 'none',
          }}
        >
          {post.title}
        </Heading>
        {post.cover && (
          <Image
            src={post.cover.src}
            alt={post.title}
            layout="constrained"
            width={post.cover.width}
            height={post.cover.height}
            className="border-border my-8 rounded-lg border-[1px]"
          />
        )}
      </div>
      <ClientOnly>{() => <Mdx code={post.body} />}</ClientOnly>
      {post.tags && (
        <div className="mt-8 flex flex-col gap-2 pb-4">
          <span className="text-sm">Tags:</span>
          <div className="flex w-full items-center gap-2 overflow-hidden">
            {[...post.tags]
              .sort((a, b) => a.localeCompare(b))
              .map((tag, index) => (
                <Link
                  key={index}
                  to={`/posts/tags/${tag}`}
                  className={badgeStyles()}
                >
                  {toTitleCase(tag)}
                </Link>
              ))}
          </div>
        </div>
      )}
    </Container>
  )
}
