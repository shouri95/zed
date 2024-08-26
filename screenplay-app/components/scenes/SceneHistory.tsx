import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Scene } from '@/lib/types'

interface SceneVersion extends Scene {
  version: number
  timestamp: Date
}

interface SceneHistoryProps {
  sceneId: string
  onRevertToVersion: (version: SceneVersion) => void
}

export function SceneHistory({ sceneId, onRevertToVersion }: SceneHistoryProps) {
  const [versions, setVersions] = useState<SceneVersion[]>([])

  useEffect(() => {
    // Fetch scene versions from API
    // This is where you'd make an API call to get the scene history
  }, [sceneId])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scene History</h3>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        {versions.map((version) => (
          <div
            key={version.version}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onRevertToVersion(version)}
          >
            <p className="font-medium">Version {version.version}</p>
            <p className="text-sm text-gray-500">{version.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}