'use client'

import { useProject } from '@/lib/contexts/ProjectContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function WithProjectProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithProjectProtectionWrapper(props: P) {
    const { currentProject } = useProject()
    const router = useRouter()

    useEffect(() => {
      if (!currentProject) {
        router.push('/')
      }
    }, [currentProject, router])

    if (!currentProject) {
      return null // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }
}