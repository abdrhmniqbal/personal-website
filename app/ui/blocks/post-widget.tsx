import PostCard from '@/ui/blocks/post-card'
import { buttonStyles } from '@/ui/components/button'
import { ArrowRight01Icon } from 'hugeicons-react'
import { Link } from 'react-router'

interface PostWidgetProps {
  posts: {
    slugAsParams: string
    title: string
    summary: string
    createdAt: string
  }[]
}
export default function PostWidget({ posts }: PostWidgetProps) {
  return (
    <div className="flex min-h-screen w-full flex-col space-y-8 pb-[20vh]">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">My Writings</h2>
        <p>
          Along with coding I also like to write about technology. Here are some
          of my recent posts.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      <Link to="/blog" className={buttonStyles()}>
        View all posts
        <ArrowRight01Icon strokeWidth={2} />
      </Link>
    </div>
  )
}