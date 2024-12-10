import { TypewriterEffect } from '@/ui/blocks/typewriter-effect'
import { buttonStyles } from '@/ui/components/button'
import { Tooltip } from '@/ui/components/tooltip'
import { Github01Icon, Mail01Icon, NewTwitterIcon } from 'hugeicons-react'
import { Link } from 'react-router'

const socialLinks = [
  {
    href: 'mailto:iqbalabdurrahman04@gmail.com',
    icon: Mail01Icon,
    title: 'Send me an email',
  },
  {
    href: 'https://github.com/abdrhmniqbal',
    icon: Github01Icon,
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
        className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl"
      />
      <p className="text-base text-muted-foreground xl:w-2/3">
        I am a web developer residing in Bandung, passionate about crafting
        intuitive, user-friendly, and performant web applications.
      </p>
      <div className="flex space-x-4">
        {socialLinks.map(({ href, icon: Icon, title }) => (
          <Tooltip delay={0} key={title}>
            <Tooltip.Trigger>
              <Link
                to={href}
                className={buttonStyles({
                  appearance: 'outline',
                  layoutMode: 'icon',
                })}
                target="_blank"
              >
                <Icon strokeWidth={2} />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Content>{title}</Tooltip.Content>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
