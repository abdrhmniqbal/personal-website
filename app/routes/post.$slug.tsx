import { posts } from '@/contents/generated'
import { ClientOnly } from '@/ui/components/client-only'
import { Container } from '@/ui/components/container'
import { Mdx } from '@/ui/components/mdx/component'
import type { Route } from './+types/post.$slug'

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
    <Container className="py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-medium lg:text-5xl">
          {post.title}
        </h1>
        {post.summary && (
          <p className="text-xl text-muted-foreground">{post.summary}</p>
        )}
      </div>
      <hr className="my-4" />
      <ClientOnly>{() => <Mdx code={post.body} />}</ClientOnly>
    </Container>
  )
}
