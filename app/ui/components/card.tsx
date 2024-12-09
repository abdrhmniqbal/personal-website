import React from 'react'
import { cn } from '@/lib/utils/css'

/** Card Base Component */
const Base = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bg-background text-foreground rounded-lg border shadow-sm',
      className,
    )}
    {...props}
  />
)
Base.displayName = 'Card'

/** Card Header Component */
const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)
Header.displayName = 'CardHeader'

/** Card Title Component */
const Title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
)
Title.displayName = 'CardTitle'

/** Card Description Component */
const Description = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-muted-foreground text-sm', className)} {...props} />
)
Description.displayName = 'CardDescription'

/** Card Content Component */
const Content = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
)
Content.displayName = 'CardContent'

/** Card Footer Component */
const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
)
Footer.displayName = 'CardFooter'

/** Card Component Composition */
const Card = Object.assign(Base, {
  Header,
  Content,
  Description,
  Footer,
  Title,
})

export { Card }
