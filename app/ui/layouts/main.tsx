import { Footer } from '@/ui/blocks/footer'
import Navbar from '@/ui/blocks/navbar'
import { Container } from '@/ui/components/container'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="mx-auto flex w-full flex-col">
      <Navbar />
      {children}
      <Footer />
    </Container>
  )
}
