import { ArrowLeft02Icon } from 'hugeicons-react'
import { useNavigate, Link } from 'react-router'
import { posts } from '@/contents/generated'
import PostCard from '@/ui/blocks/post-card'
import { buttonStyles } from '@/ui/components/button'
import { Pagination } from '@/ui/components/pagination'
import { type Route } from './+types/blog'

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
    const path = page === 1 ? '/blog' : `/blog?page=${page}`
    void navigate(path, { replace: true })
  }

  return (
    <div className="flex flex-col items-start justify-center space-y-8 pb-[20vh]">
      <h2 className="text-3xl font-semibold leading-10 tracking-tighter">
        Latest Posts
      </h2>

      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))
      ) : (
        <div className="flex min-h-[300px] w-full items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-semibold leading-10 tracking-tighter">
              No result found
            </h2>
            <Link
              to="/blog"
              className={buttonStyles({ size: 'sm', appearance: 'outline' })}
            >
              <ArrowLeft02Icon strokeWidth={2} />
              Back to Blog
            </Link>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="w-full justify-start">
          <Pagination.List>
            {currentPage > 1 && (
              <>
                <Pagination.Item
                  variant="first"
                  onAction={() => navigateToPage(1)}
                  isDisabled={currentPage === 1}
                />
                <Pagination.Item
                  variant="previous"
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
                  variant="next"
                  onAction={() => navigateToPage(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                />
                <Pagination.Item
                  variant="last"
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
