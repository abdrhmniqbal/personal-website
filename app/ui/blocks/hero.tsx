import { GithubIcon, Mail01Icon, NewTwitterIcon } from 'hugeicons-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils/css'
import { TypewriterEffect } from '@/ui/blocks/typewriter-effect'
import { buttonStyles } from '@/ui/components/button'
import { Tooltip } from '@/ui/components/tooltip'

const socialLinks = [
  {
    href: 'mailto:iqbalabdurrahman04@gmail.com',
    icon: Mail01Icon,
    title: 'Send me an email',
  },
  {
    href: 'https://github.com/abdrhmniqbal',
    icon: GithubIcon,
    title: 'Follow me on Github',
  },
  {
    href: 'https://x.com/abdrhmniqbal',
    icon: NewTwitterIcon,
    title: 'Follow me on X',
  },
]

export default function Hero() {
  const words = [
    {
      text: 'Hello,',
    },
    {
      text: "I'm",
    },
    {
      text: 'Iqbal',
      className: 'text-primary',
    },
    {
      text: 'Abdurrahman.',
      className: 'text-primary',
    },
  ]
  return (
    <div className="flex min-h-[calc(100vh-72px)] w-full flex-col items-start space-y-4 pt-24">
      <TypewriterEffect
        words={words}
        className="text-left text-2xl whitespace-nowrap sm:text-2xl md:text-3xl"
      />
      <p className="text-muted-fg text-base xl:w-2/3">
        I am a web developer residing in Bandung, passionate about crafting
        intuitive, user-friendly, and performant web applications.
      </p>
      <div className="mt-2 flex space-x-4">
        {socialLinks.map(({ href, icon: Icon, title }) => (
          <Tooltip delay={0} key={title}>
            <Tooltip.Trigger>
              <Link
                to={href}
                className={cn(
                  buttonStyles({
                    appearance: 'outline',
                    size: 'square-petite',
                  }),
                  'size-10',
                )}
                target="_blank"
              >
                <Icon data-slot="icon" strokeWidth={2} />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>{title}</Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
