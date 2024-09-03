// components/WithProjectProtection.tsx
'use client'

import { useProject } from '@/lib/contexts/ProjectContext'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'

export function WithProjectProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithProjectProtectionWrapper(props: P) {
    const { currentProject, setCurrentProject } = useProject()
    const router = useRouter()
    const params = useParams()
    const projectId = params.id as string

    useEffect(() => {
      const fetchProject = async () => {
        if (projectId && (!currentProject || currentProject.id !== projectId)) {
          try {
            // Here you would typically make an API call to fetch the project details
            // For now, we'll simulate it with a timeout and mock data
            await new Promise(resolve => setTimeout(resolve, 500))
            const mockProject = {
              id: projectId,
              title: `Project ${projectId}`,
              description: `Description for Project ${projectId}`,
              progress: 65,
              status: 'in-progress',
              genre: 'Sci-Fi',
              image: ''
            }
            setCurrentProject(mockProject)
          } catch (error) {
            console.error('Error fetching project:', error)
            router.push('/projects')
          }
        }
      }

      fetchProject()
    }, [projectId, currentProject, setCurrentProject, router])

    if (!currentProject) {
      return <div>Loading project...</div> // or a loading spinner
    }

    return <WrappedComponent {...props} />
  }
}