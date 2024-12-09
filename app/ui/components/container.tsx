import React from 'react'
import { tv } from 'tailwind-variants'

/** Styles Variants */
const containerStyles = tv({
  base: 'mx-auto w-full',
  variants: {
    intent: {
      constrained:
        'max-w-7xl sm:px-6 lg:max-w-screen-lg lg:px-8 2xl:max-w-screen-2xl',
      'padded-content':
        'max-w-7xl px-4 sm:px-6 lg:max-w-screen-lg lg:px-8 2xl:max-w-screen-2xl',
      full: 'px-0',
    },
  },
  defaultVariants: {
    intent: 'padded-content',
  },
})

/** Container Component */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: 'constrained' | 'padded-content' | 'full'
}

const Container = ({ className, intent, ...props }: ContainerProps) => (
  <div className={containerStyles({ intent, className })} {...props} />
)

export { Container }
