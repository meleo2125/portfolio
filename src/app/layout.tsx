import { Inter, Space_Grotesk, Dancing_Script, Satisfy } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '700', variable: '--font-dancing-script' })

const satisfy = Satisfy({ subsets: ['latin'], weight: '400', variable: '--font-satisfy' })

export const metadata = {
  title: 'Mukesh Prajapat',
  description: 'Personal portfolio showcasing my work and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased overflow-x-hidden max-w-full',
        inter.variable,
        spaceGrotesk.variable,
        dancingScript.variable,
        satisfy.variable
      )}>
        {children}
      </body>
    </html>
  )
}
