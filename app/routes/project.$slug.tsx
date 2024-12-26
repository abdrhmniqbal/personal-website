import { type SitemapHandle } from '@forge42/seo-tools/remix/sitemap'
import { ArrowLeft01Icon, LinkSquare02Icon } from 'hugeicons-react'
import { Link, useViewTransitionState } from 'react-router'
import { projects } from '@/contents/generated'
import { cn } from '@/lib/utils/css'
import { type SitemapData } from '@/routes/sitemap[.]xml'
import TechIcon from '@/ui/blocks/tech-icon'
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
    <Container className="pt-6 pb-[12vh]">
      <Link
        to={href}
        className={buttonStyles({ appearance: 'outline' })}
        viewTransition
      >
        <ArrowLeft01Icon data-slot="icon" strokeWidth={2} />
        See all projects
      </Link>
      <div className="mt-6 mb-2 flex flex-col">
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
      <div className="flex w-full flex-col-reverse gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:basis-2/3">
          {project.technologies && (
            <div className="mb-2 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechIcon key={tech} name={tech} width={40} />
              ))}
            </div>
          )}
          <ClientOnly>{() => <Mdx code={project.body} />}</ClientOnly>
        </div>
        <div className="flex w-full flex-col gap-4 md:basis-1/3">
          {project.linkSource && (
            <Link
              to={project.linkSource}
              className={cn(buttonStyles(), 'w-full')}
            >
              Get Started
              <LinkSquare02Icon data-slot="icon" strokeWidth={2} />
            </Link>
          )}
          {project.linkDemo && (
            <Link
              to={project.linkDemo}
              className={cn(buttonStyles({ appearance: 'outline' }), 'w-full')}
            >
              Live Demo
              <LinkSquare02Icon data-slot="icon" strokeWidth={2} />
            </Link>
          )}
        </div>
      </div>
    </Container>
  )
}
