import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Panel de Administracion",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {children}
    </div>
  )
}
