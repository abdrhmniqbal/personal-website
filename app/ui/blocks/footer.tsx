import * as React from 'react'
import { cn } from '@/lib/utils/css'
import { type Theme } from '@/lib/utils/theme.server'
import { ThemeSwitch } from '@/routes/resource.set-theme'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  userPreference?: Theme | null
}

export function Footer({ className, userPreference }: FooterProps) {
  return (
    <footer className={cn(className)}>
      <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href="https://x.com/abdrhmniqbal"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Iqbal Abdurrahman
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/abdrhmniqbal/personal-website"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ThemeSwitch userPreference={userPreference} />
      </div>
    </footer>
  )
}
