import { type Theme } from '@/lib/utils/theme.server'
import { Footer } from '@/ui/blocks/footer'
import Navbar from '@/ui/blocks/navbar'
import { Container } from '@/ui/components/container'

export default function MainLayout({
  children,
  userPreference,
}: {
  children: React.ReactNode
  userPreference?: Theme | null
}) {
  return (
    <Container className="mx-auto flex min-h-screen w-full flex-col justify-between">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer userPreference={userPreference} />
    </Container>
  )
}
