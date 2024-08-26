import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Character, ArcPoint } from '@/lib/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CharacterArcProps {
  character: Character
  onUpdate: (updatedCharacter: Character) => void
}

export function CharacterArc({ character, onUpdate }: CharacterArcProps) {
  const [arcPoints, setArcPoints] = useState<ArcPoint[]>(character.arc || [])

  const handleAddPoint = () => {
    const newPoint: ArcPoint = {
      id: Date.now().toString(),
      sceneId: '',
      description: '',
      value: 0
    }
    setArcPoints([...arcPoints, newPoint])
  }

  const handleUpdatePoint = (id: string, field: keyof ArcPoint, value: string | number) => {
    const updatedPoints = arcPoints.map(point =>
      point.id === id ? { ...point, [field]: value } : point
    )
    setArcPoints(updatedPoints)
  }

  const handleSave = () => {
    onUpdate({ ...character, arc: arcPoints })
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={arcPoints}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sceneId" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {arcPoints.map((point, index) => (
          <div key={point.id} className="mb-4 p-2 bg-gray-100 rounded">
            <Label>Scene ID</Label>
            <Input
              value={point.sceneId}
              onChange={(e) => handleUpdatePoint(point.id, 'sceneId', e.target.value)}
              className="mb-2"
            />
            <Label>Description</Label>
            <Textarea
              value={point.description}
              onChange={(e) => handleUpdatePoint(point.id, 'description', e.target.value)}
              className="mb-2"
            />
            <Label>Arc Value (-10 to 10)</Label>
            <Input
              type="number"
              min={-10}
              max={10}
              value={point.value}
              onChange={(e) => handleUpdatePoint(point.id, 'value', parseInt(e.target.value))}
            />
          </div>
        ))}
      </ScrollArea>
      <Button onClick={handleAddPoint}>Add Arc Point</Button>
      <Button onClick={handleSave}>Save Character Arc</Button>
    </div>
  )
}