import { useNavigate } from 'react-router'
import { posts } from '@/contents/generated'
import NoResult from '@/ui/blocks/no-result'
import PostCard from '@/ui/blocks/post-card'
import { Heading } from '@/ui/components/heading'
import { Pagination } from '@/ui/components/pagination'
import { type Route } from './+types/posts.index'

export function meta({ data }: Route.MetaArgs) {
  const { APP_NAME, currentPage } = data
  const pageInfo = currentPage > 1 ? `Page ${currentPage}` : ''
  return [
    { title: `Blog ${pageInfo} | ${APP_NAME}` },
    {
      name: 'description',
      content: `Latest posts written by ${data.APP_NAME}.`,
    },
  ]
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const postsPerPage = 5

  const latestPosts = posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const totalPosts = latestPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const paginatedPosts = latestPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  )

  return {
    paginatedPosts,
    totalPages,
    currentPage: page,
    APP_NAME: context.env.APP_NAME,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { paginatedPosts, totalPages, currentPage } = loaderData
  const navigate = useNavigate()

  const navigateToPage = (page: number) => {
    const path = page === 1 ? '/posts' : `/posts?page=${page}`
    void navigate(path, { replace: true })
  }

  return (
    <div className="flex flex-col items-start justify-center space-y-8 pb-[20vh]">
      <div className="flex flex-col space-y-1">
        <Heading level={1} className="pt-8">
          Latest Posts
        </Heading>
      </div>
      {paginatedPosts.length > 0 ? (
        <div className="flex w-full flex-col space-y-4">
          {paginatedPosts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      ) : (
        <NoResult />
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
