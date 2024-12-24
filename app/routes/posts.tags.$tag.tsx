import { useNavigate, Link } from 'react-router'
import { posts } from '@/contents/generated'
import { cn } from '@/lib/utils/css'
import { toTitleCase } from '@/lib/utils/string'
import PostCard from '@/ui/blocks/post-card'
import { buttonStyles } from '@/ui/components/button'
import { Pagination } from '@/ui/components/pagination'
import { type Route } from './+types/posts.tags.$tag'

export function meta({ data }: Route.MetaArgs) {
  const { APP_NAME, currentPage } = data
  const pageInfo = currentPage > 1 ? `Page ${currentPage}` : ''
  return [
    { title: `Blog: ${toTitleCase(data.tagFilter)} ${pageInfo} | ${APP_NAME}` },
    {
      name: 'description',
      content: `Posts tagged with ${toTitleCase(data.tagFilter)} written by ${data.APP_NAME}.`,
    },
  ]
}

export async function loader({ context, request, params }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const postsPerPage = 5
  const tagFilter = params.tag

  // Filter posts by tags
  const filteredPosts = posts.filter(
    (post) => Array.isArray(post.tags) && post.tags.includes(tagFilter),
  )

  // Sort filtered posts by createdAt in descending order
  const latestPosts = filteredPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const totalPosts = latestPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Paginate the sorted posts
  const paginatedPosts = latestPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  )

  return {
    paginatedPosts,
    totalPages,
    tagFilter,
    currentPage: page,
    APP_NAME: context.env.APP_NAME,
  }
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { paginatedPosts, totalPages, currentPage, tagFilter } = loaderData
  const navigate = useNavigate()

  const navigateToPage = (page: number) => {
    const path = page === 1 ? '/posts' : `/posts?page=${page}`
    void navigate(path, { replace: true })
  }

  return (
    <div className="flex flex-col items-start justify-center space-y-8 pb-[20vh]">
      <h2 className="text-3xl font-semibold leading-10 tracking-tighter">
        Tags: {toTitleCase(tagFilter)}
      </h2>

      {paginatedPosts.length > 0 ? (
        paginatedPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))
      ) : (
        <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-2">
          <div className="text-center">
            <h2 className="text-4xl font-semibold leading-10 tracking-tighter">
              No result found
            </h2>
            <p className="text-sm text-muted-foreground">
              There are no posts to display.
            </p>
            <Link
              to="/posts"
              className={cn(
                buttonStyles({ appearance: 'outline', size: 'sm' }),
                'mt-2',
              )}
            >
              Back to Posts
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
