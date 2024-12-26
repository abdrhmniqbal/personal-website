import { Tooltip } from '@/ui/components/tooltip'

interface TechIconProps {
  name: string
  width?: number
}

const techIcons: Record<string, { src: string; label: string }> = {
  hono: {
    src: '/static/icons/honojs.svg',
    label: 'Hono',
  },
  react: {
    src: '/static/icons/react.svg',
    label: 'React.js',
  },
  reactrouter: {
    src: '/static/icons/reactrouter.svg',
    label: 'React Router',
  },
  cloudflare: {
    src: '/static/icons/cloudflare.svg',
    label: 'Cloudflare',
  },
  cloudflare_workers: {
    src: '/static/icons/cloudflare.svg',
    label: 'Cloudflare Workers',
  },
  tailwindcss: {
    src: '/static/icons/tailwindcss.svg',
    label: 'Tailwind CSS',
  },
  vite: {
    src: '/static/icons/vitejs.svg',
    label: 'Vite',
  },
  velite: {
    src: '/static/icons/velite.svg',
    label: 'Velite',
  },
  typescript: {
    src: '/static/icons/typescript.svg',
    label: 'Typescript',
  },
}

export default function TechIcon({ name, width = 40 }: TechIconProps) {
  const icon = techIcons[name]

  if (!icon) return null

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <img alt={icon.label} src={icon.src} width={width} />
      </Tooltip.Trigger>
      <Tooltip.Content>{icon.label}</Tooltip.Content>
    </Tooltip>
  )
}
