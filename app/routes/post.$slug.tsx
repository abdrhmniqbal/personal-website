import { posts } from '@/contents/generated'
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
  return [{ title: data ? data.post.title : 'Iqbal Abdurrahman' }]
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPageFromParams(params.slug ? params.slug : '')
  if (!post) {
    throw new Response('Not Found', { status: 404 })
  }
  return {
    post,
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
          <p className="text-muted-foreground text-xl">{post.summary}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={post.body} />
    </Container>
  )
}
