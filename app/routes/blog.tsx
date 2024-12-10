import { posts } from '@/contents/generated'
import PostCard from '@/ui/blocks/post-card'
import { Container } from '@/ui/components/container'
import type { Route } from './+types/blog'

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Blog | ${data.APP_NAME}` },
    { name: 'description', content: `Latest posts written by ${data.APP_NAME}.` },
  ]
}

export async function loader({ context }: Route.LoaderArgs) {
  const latestPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  return { latestPosts, APP_NAME: context.env.APP_NAME }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { latestPosts } = loaderData
  return (
    <Container className="flex flex-col items-start justify-center space-y-8 pb-[20vh]">
      <h2 className="text-4xl font-bold">Latest Posts</h2>
      <p>
        Dive into my musings on tech in my latest posts; a blend of
        introspection and innovation. Keep an eye out for fresh insights and
        updates!
      </p>
      {latestPosts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </Container>
  )
}
