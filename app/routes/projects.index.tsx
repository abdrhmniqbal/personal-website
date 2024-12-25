import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDebounce } from 'use-debounce'
import { projects } from '@/contents/generated'
import NoResult from '@/ui/blocks/no-result'
import ProjectCard from '@/ui/blocks/project-card'
import { Heading } from '@/ui/components/heading'
import { Pagination } from '@/ui/components/pagination'
import { SearchField } from '@/ui/components/search-field'
import { type Route } from './+types/projects.index'

export function meta({ data }: Route.MetaArgs) {
  const { APP_NAME, currentPage } = data
  const pageInfo = currentPage > 1 ? `Page ${currentPage}` : ''
  return [
    { title: `Projects ${pageInfo} | ${APP_NAME}` },
    {
      name: 'description',
      content: `Latest projects developed by ${data.APP_NAME}.`,
    },
  ]
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const query = url.searchParams.get('q')?.toLowerCase().trim() || ''
  const projectsPerPage = 5

  const latestProjects = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

  const totalProjects = latestProjects.length
  const totalPages = Math.ceil(totalProjects / projectsPerPage)

  const paginatedProjects = latestProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage,
  )

  return {
    paginatedProjects,
    totalPages,
    currentPage: page,
    query,
    APP_NAME: context.env.APP_NAME,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { paginatedProjects, totalPages, currentPage, query } = loaderData
  const [searchValue, setSearchValue] = useState(query || '')
  const [debouncedSearch] = useDebounce(searchValue, 240)
  const navigate = useNavigate()

  const navigateToPage = (page: number) => {
    const path = page === 1 ? '/projects' : `/projects?page=${page}`
    void navigate(path, { replace: true })
  }

  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('q', debouncedSearch)
    params.set('page', '1')
    void navigate(`/projects?${params.toString()}`, { replace: true })
  }, [debouncedSearch, navigate])

  return (
    <div className="flex flex-col items-start justify-center space-y-8 pb-[20vh]">
      <div className="flex flex-col space-y-1">
        <Heading level={1} className="pt-8">
          Latest Projects
        </Heading>
      </div>
      <SearchField
        aria-label="Search"
        placeholder="Search projects..."
        value={searchValue}
        onChange={setSearchValue}
      />
      {paginatedProjects.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      ) : (
        <NoResult item="projects" />
      )}

      {totalPages > 1 && (
        <Pagination className="w-full justify-start">
          <Pagination.List>
            {currentPage > 1 && (
              <>
                <Pagination.Item
                  segment="first"
                  onAction={() => navigateToPage(1)}
                  isDisabled={currentPage === 1}
                />
                <Pagination.Item
                  segment="previous"
                  onAction={() => navigateToPage(currentPage - 1)}
                  isDisabled={currentPage === 1}
                />
              </>
            )}

            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                isCurrent={currentPage === index + 1}
                onAction={() => navigateToPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            {currentPage < totalPages && (
              <>
                <Pagination.Item
                  segment="next"
                  onAction={() => navigateToPage(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                />
                <Pagination.Item
                  segment="last"
                  onAction={() => navigateToPage(totalPages)}
                  isDisabled={currentPage === totalPages}
                />
              </>
            )}
          </Pagination.List>
        </Pagination>
      )}
    </div>
  )
}
