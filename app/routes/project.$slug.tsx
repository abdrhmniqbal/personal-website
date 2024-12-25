import { type SitemapHandle } from '@forge42/seo-tools/remix/sitemap'
import { ArrowLeft01Icon } from 'hugeicons-react'
import { Link, useViewTransitionState } from 'react-router'
import { projects } from '@/contents/generated'
import { cn } from '@/lib/utils/css'
import { type SitemapData } from '@/routes/sitemap[.]xml'
import { buttonStyles } from '@/ui/components/button'
import { ClientOnly } from '@/ui/components/client-only'
import { Container } from '@/ui/components/container'
import { Heading } from '@/ui/components/heading'
import { Image } from '@/ui/components/image'
import { Mdx } from '@/ui/components/mdx/component'
import { type Route } from './+types/project.$slug'

export const handle: SitemapHandle<SitemapData> = {
  sitemap: async (domain) => {
    const { projects } = await import('@/contents/generated')
    return projects.map((project) => ({
      route: `${domain}/project/${project.slugAsParams}`,
      priority: 1.0,
      lastmodISO: project.createdAt,
    }))
  },
}

async function getPageFromParams(params: string) {
  const project = projects.find((project) => project.slugAsParams === params)

  if (!project) {
    null
  }

  return project
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.project.title },
    { name: 'description', content: data.project.summary },
  ]
}

export async function loader({ params, context }: Route.LoaderArgs) {
  const project = await getPageFromParams(params.slug ? params.slug : '')
  if (!project) {
    throw new Response('Not Found', { status: 404 })
  }
  return {
    project,
    APP_NAME: context.env.APP_NAME,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData
  const href = `/projects`
  const isTransitioning = useViewTransitionState(href)
  return (
    <Container className="max-w-3xl pt-6 pb-[12vh] lg:max-w-3xl lg:pt-12 xl:max-w-4xl 2xl:max-w-4xl">
      <Link
        to={href}
        className={buttonStyles({ appearance: 'outline' })}
        viewTransition
      >
        <ArrowLeft01Icon data-slot="icon" strokeWidth={2} />
        See all projects
      </Link>
      <div className="mt-6 mb-4 flex flex-col">
        <div className="text-muted-fg space-x-2 text-sm">
          <span
            style={{
              viewTransitionName: isTransitioning ? 'project-type' : 'none',
            }}
          >
            {project.type}
          </span>
        </div>
        <Heading
          level={1}
          className="mt-2 inline-block text-3xl leading-tight font-semibold lg:text-4xl"
          style={{
            viewTransitionName: isTransitioning ? 'project-title' : 'none',
          }}
        >
          {project.title}
        </Heading>
        {project.cover && (
          <Image
            src={project.cover.src}
            alt={project.title}
            layout="constrained"
            width={project.cover.width}
            height={project.cover.height}
            className={cn(
              'border-border my-8 rounded-lg border-[1px]',
              isTransitioning
                ? '[view-transition-name:project-cover-image]'
                : '[view-transition-name:none]',
            )}
          />
        )}
      </div>
      <ClientOnly>{() => <Mdx code={project.body} />}</ClientOnly>
    </Container>
  )
}
