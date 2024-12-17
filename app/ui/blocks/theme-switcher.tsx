import { Moon02Icon, Sun01Icon } from 'hugeicons-react'
import { Theme, useTheme } from 'remix-themes'
import { buttonStyles } from '@/ui/components/button'
import { Menu } from '@/ui/components/menu'

export function ThemeSwitcher() {
  const [, setTheme] = useTheme()

  return (
    <Menu>
      <Menu.Trigger
        className={buttonStyles({ appearance: 'plain', layoutMode: 'icon' })}
      >
        <Sun01Icon
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          strokeWidth={2}
        />
        <Moon02Icon
          className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          strokeWidth={2}
        />
        <span className="sr-only">Toggle theme</span>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Header>Switch Theme</Menu.Header>
        <Menu.Item onAction={() => setTheme(Theme.LIGHT)}>
          <Sun01Icon className="mr-2 size-4" strokeWidth={2} />
          <span>Light</span>
        </Menu.Item>
        <Menu.Item
          onAction={() => {
            setTheme(Theme.DARK)
          }}
        >
          <Moon02Icon className="mr-2 size-4" strokeWidth={2} />
          <span>Dark</span>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
