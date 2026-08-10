import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Geist } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif-var',
})

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans-var',
})

export const metadata: Metadata = {
  title: 'The Memory Garden',
  description:
    'A shared, evolving garden where memories associated with songs bloom as hand-sketched flowers.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#dceff5',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${serif.variable} ${sans.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
