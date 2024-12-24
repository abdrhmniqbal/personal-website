import { ArrowRight01Icon } from 'hugeicons-react'
import { Link } from 'react-router'
import { type Post } from '@/contents/generated'
import PostCard from '@/ui/blocks/post-card'
import { buttonStyles } from '@/ui/components/button'
import { Description } from '@/ui/components/field'
import { Heading } from '@/ui/components/heading'

interface PostWidgetProps {
  posts: Post[]
}
export default function PostWidget({ posts }: PostWidgetProps) {
  return (
    <div className="flex min-h-screen w-full flex-col space-y-8 pb-[20vh]">
      <div className="flex flex-col space-y-2">
        <Heading level={2}>My Writings</Heading>
        <Description>
          Along with coding I also like to write about technology. Here are some
          of my recent posts.
        </Description>
      </div>
      <div className="flex flex-col space-y-4">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      <Link to="/posts" className={buttonStyles()}>
        View all posts
        <ArrowRight01Icon data-slot="icon" strokeWidth={2} />
      </Link>
    </div>
  )
}
