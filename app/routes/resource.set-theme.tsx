import { useForm, getFormProps } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import { LaptopIcon, Moon02Icon, Sun01Icon } from 'hugeicons-react'
import { redirect, useFetcher, useFetchers } from 'react-router'
import { z } from 'zod'
import { useHints, useOptionalHints } from '@/lib/utils/client-hints'
import { useOptionalRequestInfo, useRequestInfo } from '@/lib/utils/request'
import { type Theme, setTheme } from '@/lib/utils/theme.server'
import { Menu } from '@/ui/components/menu'
import { ServerOnly } from '@/ui/components/server-only'
import { type Route } from './+types/resource.set-theme'

const ThemeFormSchema = z.object({
  theme: z.enum(['system', 'light', 'dark']),
  redirectTo: z.string().optional(),
})

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  })

  invariantResponse(submission.status === 'success', 'Invalid theme received')

  const { theme, redirectTo } = submission.value

  const responseInit = {
    headers: { 'set-cookie': setTheme(theme) },
  }
  if (redirectTo) {
    return redirect(redirectTo, responseInit)
  }
  return Response.json({ result: submission.reply() }, responseInit)
}

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null
}) {
  const fetcher = useFetcher()
  const requestInfo = useRequestInfo()
  const [form] = useForm({
    id: 'theme-switch',
    lastResult: fetcher.data?.result,
  })

  const currentTheme = userPreference ?? 'system'
  const nextThemes = {
    system: 'light',
    light: 'dark',
    dark: 'system',
  } as const

  const nextTheme = nextThemes[currentTheme]
  const modeIcons = {
    system: <LaptopIcon className="text-fg size-5" strokeWidth={2} />,
    light: (
      <Sun01Icon
        className="text-fg absolute size-5 scale-100 rotate-90 transition-all dark:scale-0 dark:rotate-0"
        strokeWidth={2}
      />
    ),
    dark: (
      <Moon02Icon
        className="text-fg absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        strokeWidth={2}
      />
    ),
  }

  return (
    <fetcher.Form
      method="POST"
      {...getFormProps(form)}
      action="/resources/theme-switch"
    >
      <ServerOnly>
        {() => (
          <input type="hidden" name="redirectTo" value={requestInfo.path} />
        )}
      </ServerOnly>
      <input type="hidden" name="theme" value={nextTheme} />
      <Menu>
        <Menu.Trigger className="flex h-8 w-8 cursor-pointer items-center justify-center">
          {modeIcons[currentTheme]}
          <span className="sr-only">Toggle theme</span>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Header>Switch Theme</Menu.Header>
          <Menu.Item
            onAction={() =>
              fetcher.submit(
                { theme: 'light' },
                { method: 'post', action: '/resource/set-theme' },
              )
            }
          >
            <Sun01Icon className="text-fg mr-2 size-4" strokeWidth={2} />
            <span>Light</span>
          </Menu.Item>
          <Menu.Item
            onAction={() =>
              fetcher.submit(
                { theme: 'dark' },
                { method: 'post', action: '/resource/set-theme' },
              )
            }
          >
            <Moon02Icon className="text-fg mr-2 size-4" strokeWidth={2} />
            <span>Dark</span>
          </Menu.Item>
          <Menu.Item
            onAction={() =>
              fetcher.submit(
                { theme: 'system' },
                { method: 'post', action: '/resource/set-theme' },
              )
            }
          >
            <LaptopIcon className="text-fg mr-2 size-4" strokeWidth={2} />
            <span>System</span>
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </fetcher.Form>
  )
}

export function useOptimisticThemeMode(): Theme | undefined {
  const fetchers = useFetchers()
  const themeFetcher = fetchers.find(
    (f) => f.formAction === '/resources/theme-switch',
  )

  if (themeFetcher?.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema,
    })

    if (submission.status === 'success') {
      return submission.value.theme
    }
  }
}

export function useTheme(): Theme {
  const hints = useHints()
  const requestInfo = useRequestInfo()
  const optimisticMode = useOptimisticThemeMode()
  if (optimisticMode) {
    return optimisticMode === 'system' ? hints.theme : optimisticMode
  }
  return requestInfo.userPrefs.theme ?? hints.theme
}

export function useOptionalTheme(): Theme | undefined {
  const optionalHints = useOptionalHints()
  const optionalRequestInfo = useOptionalRequestInfo()
  const optimisticMode = useOptimisticThemeMode()
  if (optimisticMode) {
    return optimisticMode === 'system' ? optionalHints?.theme : optimisticMode
  }
  return optionalRequestInfo?.userPrefs.theme ?? optionalHints?.theme
}
