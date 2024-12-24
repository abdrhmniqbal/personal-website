import { ArrowRight02Icon } from 'hugeicons-react'
import { Link } from 'react-router'
import { type Post } from '@/contents/generated'
import { formatDate } from '@/lib/utils/date'
import { toTitleCase } from '@/lib/utils/string'
import { Card } from '@/ui/components/card'
import { ScrollArea, ScrollBar } from '@/ui/components/scroll-area'
import { tagStyles } from '@/ui/components/tag'
import { TouchTarget } from '@/ui/components/touch-target'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.slugAsParams}`} className="w-full">
      <TouchTarget key={post.slugAsParams}>
        <Card className="group w-full hover:bg-primary/5 group-hover:cursor-pointer">
          <Card.Header className="pb-2">
            <Card.Title className="line-clamp-2 flex items-center justify-between leading-8 tracking-tight group-hover:underline">
              {post.title}
              <ArrowRight02Icon
                strokeWidth={2}
                className="hidden aspect-square min-h-6 min-w-6 translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
              />
            </Card.Title>
            <Card.Description className="flex items-center gap-1 text-sm text-muted-foreground">
              <time>{formatDate(post.createdAt)}</time>
              <span>•</span>
              <span>{post.metadata.readingTime} min read</span>
            </Card.Description>
          </Card.Header>
          <Card.Content>{post.summary}</Card.Content>
          {post.tags && (
            <Card.Footer className="flex h-[32px] w-full p-0 px-6 pb-4 pt-0">
              <ScrollArea className="flex w-full whitespace-nowrap">
                <div className="flex w-full items-center gap-2 overflow-hidden pb-4">
                  {[...post.tags]
                    .sort((a, b) => a.localeCompare(b))
                    .map((tag, index) => (
                      <Link
                        key={index}
                        to={`/posts/tags/${tag}`}
                        className={tagStyles()}
                      >
                        {toTitleCase(tag)}
                      </Link>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Card.Footer>
          )}
        </Card>
      </TouchTarget>
    </Link>
  )
}
