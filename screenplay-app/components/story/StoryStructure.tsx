import React, { useState } from 'react'
import { Scene } from '@/lib/types'
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StoryStructureProps {
  scenes: Scene[]
  onUpdateScenes: (updatedScenes: Scene[]) => void
}

const threeActStructure = [
  { name: 'Act 1: Setup', percentage: 25 },
  { name: 'Act 2: Confrontation', percentage: 50 },
  { name: 'Act 3: Resolution', percentage: 25 },
]

const heroJourney = [
  { name: 'Ordinary World', percentage: 10 },
  { name: 'Call to Adventure', percentage: 5 },
  { name: 'Refusal of the Call', percentage: 5 },
  { name: 'Meeting the Mentor', percentage: 5 },
  { name: 'Crossing the Threshold', percentage: 10 },
  { name: 'Tests, Allies, Enemies', percentage: 20 },
  { name: 'Approach to the Inmost Cave', percentage: 10 },
  { name: 'Ordeal', percentage: 10 },
  { name: 'Reward', percentage: 5 },
  { name: 'The Road Back', percentage: 10 },
  { name: 'Resurrection', percentage: 5 },
  { name: 'Return with the Elixir', percentage: 5 },
]

export function StoryStructure({ scenes, onUpdateScenes }: StoryStructureProps) {
  const [selectedStructure, setSelectedStructure] = useState('threeAct')

  const applyStructure = () => {
    const structure = selectedStructure === 'threeAct' ? threeActStructure : heroJourney
    const totalScenes = scenes.length
    let sceneIndex = 0

    const updatedScenes = structure.flatMap(phase => {
      const phaseSceneCount = Math.round((phase.percentage / 100) * totalScenes)
      const phaseScenes = scenes.slice(sceneIndex, sceneIndex + phaseSceneCount).map(scene => ({
        ...scene,
        storyPhase: phase.name
      }))
      sceneIndex += phaseSceneCount
      return phaseScenes
    })

    onUpdateScenes(updatedScenes)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Story Structure</h3>
      <div className="flex space-x-2">
        <Select
          value={selectedStructure}
          onValueChange={setSelectedStructure}
        >
          <option value="threeAct">Three-Act Structure</option>
          <option value="heroJourney">Hero's Journey</option>
        </Select>
        <Button onClick={applyStructure}>Apply Structure</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(selectedStructure === 'threeAct' ? threeActStructure : heroJourney).map((phase, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{phase.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{phase.percentage}% of the story</p>
              <p>{scenes.filter(scene => scene.storyPhase === phase.name).length} scenes</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}