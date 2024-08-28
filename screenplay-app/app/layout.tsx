// app/layout.tsx
import './globals.css'
import '../styles/custom.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TopNavBar } from '@/components/TopNavBar'
import { Toaster } from "@/components/ui/toaster"
import { ProjectProvider } from '@/lib/contexts/ProjectContext'

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
        <ProjectProvider>
          <div className="flex flex-col min-h-screen">
            <TopNavBar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <Toaster />
        </ProjectProvider>
      </body>
    </html>
  )
}