import Hero from '@/ui/blocks/hero'
import { Container } from '@/ui/components/container'
import type { Route } from './+types/_index'

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <Container className="flex items-center justify-center">
      <Hero />
    </Container>
  )
}
