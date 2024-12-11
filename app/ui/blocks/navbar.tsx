import { cn } from '@/lib/utils/css'
import { buttonStyles } from '@/ui/components/button'
import { NavLink } from 'react-router'

const mainMenu = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
]

export default function Navbar() {
  return (
    <header className="relative flex h-full items-center justify-end py-4">
      <div className="flex items-center">
        {mainMenu.map(({ title, href }) => (
          <NavLink
            className={({ isActive }) =>
              cn(buttonStyles({ appearance: 'link' }), isActive && 'font-semibold underline')
            }
            to={href}
            key={title}
          >
            {title}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
