import { ArrowRight01Icon } from 'hugeicons-react'
import { motion } from 'motion/react'
import { Link } from 'react-router'
import { type Project } from '@/contents/generated'
import { cn } from '@/lib/utils/css'
import ProjectCard from '@/ui/blocks/project-card'
import { buttonStyles } from '@/ui/components/button'
import { Carousel } from '@/ui/components/carousel'
import { Description } from '@/ui/components/field'
import { Heading } from '@/ui/components/heading'

interface ProjectWidgetProps {
  projects: Project[]
}

export default function ProjectWidget({ projects }: ProjectWidgetProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-end pb-[20vh]">
      <Carousel className="flex w-full flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <Heading level={2} className="flex items-baseline justify-between">
            <span>My Projects</span>
            <Carousel.Handler>
              <Carousel.Button slot="previous" />
              <Carousel.Button slot="next" />
            </Carousel.Handler>
          </Heading>
          <Description>
            I've been working on a lot of projects lately. Here are some of my
            recent projects.
          </Description>
        </div>
        <Carousel.Content>
          {projects.map((project, index) => (
            <Carousel.Item className="sm:basis-1/2 lg:basis-1/3" key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel>
      <Link to="/projects" className={cn(buttonStyles(), 'w-full sm:w-fit')}>
        View all projects
        <ArrowRight01Icon data-slot="icon" strokeWidth={2} />
      </Link>
    </div>
  )
}
