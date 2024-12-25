import { Link } from 'react-router'
import { cn } from '@/lib/utils/css'
import { toTitleCase } from '@/lib/utils/string'
import { buttonStyles } from '@/ui/components/button'
import { Heading } from '@/ui/components/heading'

export default function NoResult({ item }: { item: string }) {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-2">
      <div className="text-center">
        <Heading level={2}>No result found</Heading>
        <p className="text-muted-fg text-sm">There are no {item} to display.</p>
        <Link
          to={`/${item}`}
          className={cn(
            buttonStyles({ appearance: 'outline', size: 'small' }),
            'mt-4',
          )}
        >
          Back to {toTitleCase(item)}
        </Link>
      </div>
    </div>
  )
}
