// components/layout/ClientLayout.tsx
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { TopNavBar } from '@/components/layout/TopNavBar'
import Sidebar from '@/components/layout/Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Determine if the current page should hide the sidebar
  const hideSidebarPaths = ['/', '/sign-in', '/sign-up', '/workspace', '/projects']
  const shouldHideSidebar = hideSidebarPaths.some(path => pathname.startsWith(path))

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <div className="flex flex-1 pt-16"> {/* Add top padding to account for TopNavBar height */}
        {!shouldHideSidebar && (
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}