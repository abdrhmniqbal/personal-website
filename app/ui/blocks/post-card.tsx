import { Card } from '@/ui/components/card'
import { TouchTarget } from '@/ui/components/touch-target'
import { ArrowRight02Icon } from 'hugeicons-react'
import { useNavigate } from 'react-router'
import { formatDate } from '@/lib/utils/date'

interface PostCardProps {
  post: {
    slugAsParams: string
    title: string
    summary: string
    createdAt: string
  }
}
export default function PostCard({ post }: PostCardProps) {
  let navigate = useNavigate()
  return (
    <TouchTarget key={post.slugAsParams}>
      <Card
        className="hover:bg-primary/5 group w-full group-hover:cursor-pointer"
        onClick={() => navigate(`/post/${post.slugAsParams}`)}
      >
        <Card.Header className="pb-2">
          <Card.Title className="flex items-center justify-between">
            {post.title}
            <ArrowRight02Icon
              strokeWidth={2}
              className="size-6 translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Card.Title>
          <Card.Description>{formatDate(post.createdAt)}</Card.Description>
        </Card.Header>
        <Card.Content>{post.summary}</Card.Content>
      </Card>
    </TouchTarget>
  )
}