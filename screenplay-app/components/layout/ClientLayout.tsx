// components/layout/ClientLayout.tsx
'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { TopNavBar } from '@/components/layout/TopNavBar'

const DashNav = dynamic(() => import('@/components/DashNav'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Determine if the current page should hide the sidebar
  const hideSidebarPaths = ['/', '/sign-in', '/sign-up', '/workspace', '/projects']
  const shouldHideSidebar = hideSidebarPaths.some(path => pathname.startsWith(path))

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && <DashNav />}
      <div className="flex-grow">
        <TopNavBar />
        <main className={shouldHideSidebar ? '' : "pt-16 pl-80"}>
          {children}
        </main>
      </div>
    </div>
  )
}
