import { useState, useEffect } from 'react'
import { Project } from '@/lib/types/types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        // In a real application, this would be an API call
        const mockProjects: Project[] = [
          { id: '1', title: 'The Great Heist', description: 'An action-packed thriller', genre: 'Action', status: 'active', progress: 75, image: '/placeholder-project-image.jpg', lastEdited: '2023-08-15' },
          { id: '2', title: 'Laugh Out Loud', description: 'A hilarious comedy', genre: 'Comedy', status: 'active', progress: 30, image: '/placeholder-project-image.jpg', lastEdited: '2023-08-10' },
          { id: '3', title: 'The Haunting', description: 'A spine-chilling horror', genre: 'Horror', status: 'active', progress: 50, image: '/placeholder-project-image.jpg', lastEdited: '2023-08-12' },
          { id: '4', title: 'City of Dreams', description: 'A compelling drama', genre: 'Drama', status: 'completed', progress: 100, image: '/placeholder-project-image.jpg', completed: '2023-08-05' },
          { id: '5', title: 'The Sting', description: 'A suspenseful thriller', genre: 'Thriller', status: 'active', progress: 60, image: '/placeholder-project-image.jpg', lastEdited: '2023-08-08' },
        ]
        setProjects(mockProjects)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching projects'))
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}