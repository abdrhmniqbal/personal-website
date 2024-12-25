import { Image } from '@unpic/react'
import { Link, useViewTransitionState } from 'react-router'
import { type Project } from '@/contents/generated'
import { cn } from '@/lib/utils/css'
import { AspectRatio } from '@/ui/components/aspect-ratio'
import { Card } from '@/ui/components/card'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const href = `/project/${project.slugAsParams}`
  const isTransitioning = useViewTransitionState(href)
  return (
    <Link to={href} className="w-full" viewTransition>
      <Card className="group hover:bg-primary/5 w-full group-hover:cursor-pointer">
        <AspectRatio ratio={384 / 246} className="overflow-hidden rounded-t-lg">
          <Image
            src={project.cover.src}
            alt={project.title}
            layout="constrained"
            width={project.cover.width}
            height={project.cover.height}
            className={cn(
              'h-full w-full overflow-hidden object-cover transition-all group-hover:scale-125',
              isTransitioning
                ? '[view-transition-name:project-cover-image]'
                : '[view-transition-name:none]',
            )}
          />
        </AspectRatio>
        <Card.Header className="pb-2">
          <Card.Title
            className="flex items-center justify-between leading-6 group-hover:underline"
            tracking="tight"
            style={{
              viewTransitionName: isTransitioning ? 'project-title' : 'none',
            }}
          >
            {project.title}
          </Card.Title>
          <Card.Description className="text-muted-fg flex items-center gap-1 text-sm">
            <span
              style={{
                viewTransitionName: isTransitioning ? 'project-type' : 'none',
              }}
            >
              {project.type}
            </span>
          </Card.Description>
        </Card.Header>
        <Card.Content>{project.summary}</Card.Content>
      </Card>
    </Link>
  )
}
