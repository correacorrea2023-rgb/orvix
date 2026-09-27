import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'ORVIX',
  description: 'Todo tu trabajo. Un solo lugar.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  )
}
