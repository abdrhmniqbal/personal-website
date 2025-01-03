import { posts, projects } from '@/contents/generated'
import Hero from '@/ui/blocks/hero'
import PostWidget from '@/ui/blocks/post-widget'
import ProjectWidget from '@/ui/blocks/project-widget'
import { type Route } from './+types/_index'

export async function loader() {
  const latestPosts = posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3)

  const latestProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5)

  return { latestPosts, latestProjects }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { latestPosts, latestProjects } = loaderData
  return (
    <div className="grid-background flex flex-col items-center justify-center">
      <Hero />
      {latestProjects.length > 0 && <ProjectWidget projects={latestProjects} />}
      {latestPosts.length > 0 && <PostWidget posts={latestPosts} />}
    </div>
  )
}
