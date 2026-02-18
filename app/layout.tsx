import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ASO-RECICLADOR E.S.P. | Unidos por el cuidado ambiental',
  description:
    'Organizacion gremial de recicladores de oficio en Monteria, Cordoba. Recoleccion, transporte y aprovechamiento de reciclaje en la fuente. Dignificamos el oficio del reciclaje.',
  keywords: [
    'reciclaje',
    'Monteria',
    'Cordoba',
    'recicladores',
    'medio ambiente',
    'aprovechamiento',
    'ASO-RECICLADOR',
  ],
  openGraph: {
    title: 'ASO-RECICLADOR E.S.P. | Unidos por el cuidado ambiental',
    description:
      'Organizacion gremial de recicladores de oficio. Dignificamos el reciclaje en la region caribe colombiana.',
    type: 'website',
    locale: 'es_CO',
  },
}

export const viewport: Viewport = {
  themeColor: '#1b5e20',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
