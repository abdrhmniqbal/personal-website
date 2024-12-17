import { ArrowLeft02Icon } from 'hugeicons-react'
import { Link } from 'react-router'
import { posts } from '@/contents/generated'
import { formatDate } from '@/lib/utils/date'
import { buttonStyles } from '@/ui/components/button'
import { ClientOnly } from '@/ui/components/client-only'
import { Image } from '@/ui/components/image'
import { Mdx } from '@/ui/components/mdx/component'
import { type Route } from './+types/post.$slug'

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
  return (
    <div className="pt-6 lg:py-12">
      <Link to="/blog" className={buttonStyles({ appearance: 'outline' })}>
        <ArrowLeft02Icon strokeWidth={2} />
        See all posts
      </Link>
      <div className="mb-4 mt-6 flex flex-col">
        <time className="text-sm text-muted-foreground">
          Published on {formatDate(post.createdAt)}
        </time>
        <h1 className="mt-2 inline-block text-4xl font-semibold leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {post.cover && (
          <Image
            src={post.cover.src}
            alt={post.title}
            layout="constrained"
            width={post.cover.width}
            height={post.cover.height}
            className="my-8 rounded-lg border-[1px] border-border"
          />
        )}
      </div>
      <ClientOnly>{() => <Mdx code={post.body} />}</ClientOnly>
    </div>
  )
}
