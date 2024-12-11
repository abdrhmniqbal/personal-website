import Navbar from '@/ui/blocks/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Navbar />
      {children}
    </div>
  )
}
