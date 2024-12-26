import { Task01Icon, TaskDone01Icon } from 'hugeicons-react'
import React, { useOptimistic, useTransition } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/css'
import { Button, buttonStyles } from '@/ui/components/button'
import { Menu } from '@/ui/components/menu'

export function extractCode(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }
  if (React.isValidElement(children)) {
    //@ts-expect-error - This is a hack to get the children of the element
    return extractCode(children.props.children)
  }
  return React.Children.toArray(children).map(extractCode).join('')
}

type PackageManager = 'pnpm' | 'yarn' | 'bun'

const commandMappings = {
  install: { pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' },
  run: { pnpm: 'pnpm run', yarn: 'yarn run', bun: 'bun' },
  npx: { pnpm: 'pnpm dlx', yarn: 'yarn dlx', bun: 'bunx' },
} as const

function convertCommand(command: string, to: PackageManager): string {
  const [mainCommand, ...args] = command.split(' ')
  if (mainCommand === 'npm') {
    const npmSubCommand = args[0] as keyof typeof commandMappings // Explicitly narrow the type
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

export function CopyButton({ value }: { value: string }) {
  const isNpmCommand = value.startsWith('npm')
  const [state, setState] = useOptimistic<'idle' | 'copied'>('idle')
  const [, startTransition] = useTransition()

  const handleCopy = (command: string) => {
    startTransition(async () => {
			toast.promise(navigator.clipboard.writeText(command), {
				loading: "Copying text...",
				success: "Text has been copied to clipboard.",
				error: "Error occurred while copying text to clipboard.",
			})
      setState('copied')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setState('idle')
    })
  }

  if (isNpmCommand) {
    // If the command starts with "npm", render the Menu for conversion
    return (
      <Menu>
        <Menu.Trigger
          className={cn(
            buttonStyles({ appearance: 'plain', size: 'square-petite' }),
            'text-bg hover:text-bg/60 dark:text-fg dark:hover:text-fg/60 absolute top-0 right-0 z-10 mt-3 mr-2 size-8 p-2 hover:bg-transparent [&_svg]:size-4',
          )}
        >
          {state === 'copied' ? (
            <TaskDone01Icon className="size-3" strokeWidth={2} />
          ) : (
            <Task01Icon className="size-3" strokeWidth={2} />
          )}
        </Menu.Trigger>
        <Menu.Content className="relative">
          <Menu.Item onAction={() => handleCopy(value)}>npm</Menu.Item>
          {(['yarn', 'pnpm', 'bun'] as PackageManager[]).map((pkg) => (
            <Menu.Item
              key={pkg}
              onAction={() => handleCopy(convertCommand(value, pkg))}
            >
              {pkg}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
    )
  }

  return (
    <Button
      size="square-petite"
      appearance="plain"
      className="text-bg hover:text-bg/60 dark:text-fg dark:hover:text-fg/60 absolute top-0 right-0 z-10 mt-3 mr-2 size-8 p-2 hover:bg-transparent [&_svg]:size-4"
      onPress={() => handleCopy(value)}
    >
      <span className="sr-only">Copy</span>
      {state === 'copied' ? (
        <TaskDone01Icon strokeWidth={2} />
      ) : (
        <Task01Icon strokeWidth={2} />
      )}
    </Button>
  )
}
