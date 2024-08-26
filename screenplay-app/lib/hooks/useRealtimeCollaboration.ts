import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { Scene } from '@/lib/types'

export function useRealtimeCollaboration(sceneId: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [collaborators, setCollaborators] = useState<string[]>([])

  useEffect(() => {
    const newSocket = io('http://your-backend-url', {
      query: { sceneId }
    })

    setSocket(newSocket)

    newSocket.on('collaborators_update', (updatedCollaborators: string[]) => {
      setCollaborators(updatedCollaborators)
    })

    return () => {
      newSocket.disconnect()
    }
  }, [sceneId])

  const updateScene = (updatedScene: Partial<Scene>) => {
    if (socket) {
      socket.emit('scene_update', updatedScene)
    }
  }

  return { collaborators, updateScene }
}