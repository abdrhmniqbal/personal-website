import { useMDXComponent } from '@/lib/hooks/use-mdx-component'

interface MdxProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code)
  return <Component components={{ Image, ...components }} />
}
