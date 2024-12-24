import { Link } from 'react-router'
import { cn } from '@/lib/utils/css'
import { buttonStyles } from '@/ui/components/button'
import { Heading } from '@/ui/components/heading'

export default function NoResult() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-2">
      <div className="text-center">
        <Heading level={2}>No result found</Heading>
        <p className="text-muted-fg text-sm">There are no posts to display.</p>
        <Link
          to="/posts"
          className={cn(
            buttonStyles({ appearance: 'outline', size: 'small' }),
            'mt-4',
          )}
        >
          Back to Posts
        </Link>
      </div>
    </div>
  )
}