import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Scene } from '@/lib/types'
import { formatScreenplayContent } from '@/lib/utils'

interface ScriptExportProps {
  scenes: Scene[]
}

export function ScriptExport({ scenes }: ScriptExportProps) {
  const [exportFormat, setExportFormat] = useState('pdf')

  const handleExport = async () => {
    const formattedContent = scenes
      .sort((a, b) => a.order - b.order)
      .map(scene => formatScreenplayContent(scene.content))
      .join('\n\n')

    // In a real application, you would send this to your backend for processing
    // and file generation. Here's a simulation of that process:
    console.log(`Exporting screenplay in ${exportFormat} format`)
    console.log(formattedContent)

    // Simulating a file download
    const blob = new Blob([formattedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `screenplay.${exportFormat}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Export Screenplay</h3>
      <div className="flex space-x-2">
        <Select
          value={exportFormat}
          onValueChange={setExportFormat}
        >
          <option value="pdf">PDF</option>
          <option value="fdx">Final Draft (FDX)</option>
          <option value="fountain">Fountain</option>
        </Select>
        <Button onClick={handleExport}>Export</Button>
      </div>
    </div>
  )
}