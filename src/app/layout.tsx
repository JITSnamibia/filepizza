import React from 'react'
import '../styles.css'
import { ThemeProvider } from '../components/ThemeProvider'
import { ModeToggle } from '../components/ModeToggle'
import JitsLabsShareQueryClientProvider from '../components/QueryClientProvider'
import { Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'JitsLabs Share • Secure browser file transfers.',
  description: 'Peer-to-peer file transfers in your web browser.',
  charSet: 'utf-8',
  openGraph: {
    url: 'https://share.jitslabs.org',
    title: 'JitsLabs Share • Secure browser file transfers.',
    description: 'Peer-to-peer file transfers in your web browser.',
    images: [{ url: 'https://share.jitslabs.org/images/fb.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <JitsLabsShareQueryClientProvider>
              <main>{children}</main>
              <ModeToggle />
            </JitsLabsShareQueryClientProvider>
          </ThemeProvider>
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  )
}
