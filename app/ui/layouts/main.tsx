import Navbar from '@/ui/blocks/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid-background mx-auto flex w-full flex-col">
      <Navbar />
      {children}
    </div>
  )
}
