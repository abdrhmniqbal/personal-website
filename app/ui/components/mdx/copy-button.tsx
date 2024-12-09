import * as React from 'react'
import type { ButtonProps } from '@/ui/components/button'
import { Button, buttonStyles } from '@/ui/components/button'
import { dropdownItemStyles } from '@/ui/components/dropdown'
import { Menu } from '@/ui/components/menu'
import { Task01Icon, TaskDone01Icon } from 'hugeicons-react'
import { cn } from '@/lib/utils/css'

export function extractCode(children: React.ReactNode): string {
  let code = ''
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      code += child
    } else if (React.isValidElement(child)) {
      code += extractCode(child.props.children)
    }
  })
  return code
}

interface CopyButtonProps extends ButtonProps {
  value: string
}

async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export function CopyButton({ value, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <Button
      layoutMode="icon"
      appearance="plain"
      className="text-background hover:text-background/60 dark:hover:text-foreground/60 dark:text-foreground absolute right-0 top-0 z-10 mr-2 mt-3 size-8 p-2 hover:bg-transparent [&_svg]:size-4"
      onPress={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <TaskDone01Icon strokeWidth={2} />
      ) : (
        <Task01Icon strokeWidth={2} />
      )}
    </Button>
  )
}

type PackageManager = 'pnpm' | 'yarn' | 'bun'

type CommandMapping = {
  [key: string]: {
    pnpm: string
    yarn: string
    bun: string
  }
}

const commandMappings: CommandMapping = {
  install: { pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' },
  run: { pnpm: 'pnpm run', yarn: 'yarn run', bun: 'bun' },
  npx: { pnpm: 'pnpm dlx', yarn: 'yarn dlx', bun: 'bunx' },
}

function convertCommand(command: string, to: PackageManager): string {
  const [mainCommand, ...args] = command.split(' ')
  if (mainCommand === 'npm') {
    const npmSubCommand = args[0]
    if (npmSubCommand in commandMappings) {
      return `${commandMappings[npmSubCommand][to]} ${args.slice(1).join(' ')}`.trim()
    }
    return command.replace('npm', to)
  }
  if (mainCommand === 'npx') {
    return `${commandMappings.npx[to]} ${args.join(' ')}`.trim()
  }
  return command
}

export function CommandCopyButton({ value }: CopyButtonProps) {
  console.log(value)
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const handleCopy = (value: string) => {
    copyToClipboardWithMeta(value)
    setHasCopied(true)
  }

  return (
    <Menu>
      <Menu.Trigger
        className={cn(
          buttonStyles({ appearance: 'plain', layoutMode: 'icon' }),
          'text-background hover:text-background/60 dark:text-foreground dark:hover:text-foreground/60 absolute right-0 top-0 z-10 mr-2 mt-3 size-8 p-2 hover:bg-transparent [&_svg]:size-4',
        )}
      >
        {hasCopied ? (
          <TaskDone01Icon className="size-3" strokeWidth={2} />
        ) : (
          <Task01Icon className="size-3" strokeWidth={2} />
        )}
      </Menu.Trigger>
      <Menu.Content className="relative">
        <Button
          className={dropdownItemStyles()}
          onPress={() => handleCopy(value)}
        >
          npm
        </Button>
        {(['yarn', 'pnpm', 'bun'] as PackageManager[]).map((pkg) => (
          <Button
            key={pkg}
            className={dropdownItemStyles()}
            onPress={() => handleCopy(convertCommand(value, pkg))}
          >
            {pkg}
          </Button>
        ))}
      </Menu.Content>
    </Menu>
  )
}
