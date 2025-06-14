import { Inter, Space_Grotesk, Dancing_Script, Satisfy } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import CustomCursor from '@/components/CustomCursor'

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

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="description" content="Mukeshkumar Prajapat - AI & Web Development Portfolio. Building AI-driven solutions and seamless web experiences." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased overflow-x-hidden max-w-full',
        inter.variable,
        spaceGrotesk.variable,
        dancingScript.variable,
        satisfy.variable
      )}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function setVh() {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }
              setVh();
              window.addEventListener('resize', setVh);
            `,
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
