import { buttonStyles } from '@/ui/components/button'
import { Container } from '@/ui/components/container'
import { NavLink } from 'react-router'

const mainMenu = [{ title: 'Home', href: '/' }]

export default function Navbar() {
  return (
    <Container className="relative flex h-full items-center justify-end py-4">
      <div className="flex items-center">
        {mainMenu.map(({ title, href }) => (
          <NavLink className={buttonStyles({ appearance: 'link' })} to={href}>
            {title}
          </NavLink>
        ))}
      </div>
    </Container>
  )
}
