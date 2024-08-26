import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Scene } from '@/lib/types'

interface SceneVersion extends Scene {
  version: number
  timestamp: Date
}

interface SceneHistoryProps {
  sceneVersions: SceneVersion[]
  onRevertToVersion: (version: SceneVersion) => void
}

export function SceneHistory({ sceneVersions, onRevertToVersion }: SceneHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<SceneVersion | null>(null)

  const handleSelectVersion = (version: SceneVersion) => {
    setSelectedVersion(version)
  }

  const handleRevert = () => {
    if (selectedVersion) {
      onRevertToVersion(selectedVersion)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scene History</h3>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        {sceneVersions.map((version) => (
          <div
            key={version.version}
            className={`p-2 cursor-pointer ${selectedVersion?.version === version.version ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleSelectVersion(version)}
          >
            <p className="font-medium">Version {version.version}</p>
            <p className="text-sm text-gray-500">{version.timestamp.toLocaleString()}</p>
          </div>
        ))}
      </ScrollArea>
      {selectedVersion && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Version: {selectedVersion.version}</h4>
          <p className="text-sm">{selectedVersion.content.substring(0, 100)}...</p>
          <Button onClick={handleRevert}>Revert to This Version</Button>
        </div>
      )}
    </div>
  )
}