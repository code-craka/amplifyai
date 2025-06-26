import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'AmplifyAI - AI Content Engine',
  description: 'From 6 hours to 6 minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  )
}