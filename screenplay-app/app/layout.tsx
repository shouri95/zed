// app/layout.tsx
import './globals.css'
import '../styles/custom.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import '@/styles/embla.css'
import { ProjectProvider } from '@/lib/contexts/ProjectContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import ClientLayout from '@/components/layout/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Raay',
  description: 'An interactive app for developing and organizing screenplays',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <ProjectProvider>
            <ClientLayout>{children}</ClientLayout>
            <Toaster />
          </ProjectProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}