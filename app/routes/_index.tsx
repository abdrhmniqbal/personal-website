import { posts } from '@/contents/generated'
import Hero from '@/ui/blocks/hero'
import PostWidget from '@/ui/blocks/post-widget'
import { Container } from '@/ui/components/container'
import type { Route } from './+types/_index'

export async function loader() {
  const latestPosts = posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3)

  return { latestPosts }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { latestPosts } = loaderData
  return (
    <Container className="flex flex-col items-center justify-center">
      <Hero />
      <PostWidget posts={latestPosts} />
    </Container>
  )
}
