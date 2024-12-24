'use client'

import type React from 'react'

import { type VariantProps, tv } from 'tailwind-variants'

const tagIntents = {
  primary: [
    '[--tag-primary:color-mix(in_oklab,var(--color-primary)_10%,white_90%)] [--tag-primary-foreground:color-mix(in_oklab,var(--color-primary)_60%,white_40%)] bg-(--tag-primary)',
    'dark:bg-primary/15 text-primary dark:text-(--tag-primary-foreground) dark:group-data-hovered:bg-primary/25',
    'group-data-hovered:bg-[color-mix(in_oklab,var(--color-primary)_15%,white_85%)] dark:group-data-hovered:bg-primary/20',
  ],
  secondary: [
    'bg-secondary group-data-hovered:bg-muted dark:bg-secondary dark:group-data-hovered:bg-muted text-secondary-foreground',
  ],
  success: [
    'bg-emerald-500/15 text-emerald-700 group-data-hovered:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-hovered:bg-emerald-500/20',
  ],
  info: 'bg-sky-500/15 text-sky-700 group-data-hovered:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-hovered:bg-sky-500/20',
  warning:
    'bg-amber-400/20 text-amber-700 group-data-hovered:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-hovered:bg-amber-400/15',
  danger:
    'bg-red-500/15 text-red-700 group-data-hovered:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-hovered:bg-red-500/20',
}
const tagShapes = {
  square: 'rounded-md px-1.5',
  circle: 'px-2 rounded-full',
}
const tagStyles = tv({
  base: '**:data-[slot=icon]:size-3 inline-flex items-center gap-x-1.5 py-0.5 text-xs/5 font-medium forced-colors:outline',
  variants: {
    intent: { ...tagIntents },
    shape: { ...tagShapes },
  },
  defaultVariants: {
    intent: 'primary',
    shape: 'circle',
  },
})

interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagStyles> {
  className?: string
  children: React.ReactNode
}

const Tag = ({ children, intent, shape, className, ...props }: TagProps) => {
  return (
    <span {...props} className={tagStyles({ intent, shape, className })}>
      {children}
    </span>
  )
}

export type { TagProps }
export { Tag, tagIntents, tagStyles, tagShapes }
