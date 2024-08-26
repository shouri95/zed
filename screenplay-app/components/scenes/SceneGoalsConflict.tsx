import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus } from 'lucide-react'

interface GoalConflict {
  id: string
  type: 'goal' | 'conflict'
  content: string
}

interface SceneGoalsConflictsProps {
  initialGoalsConflicts: GoalConflict[]
  onUpdate: (goalsConflicts: GoalConflict[]) => void
}

export function SceneGoalsConflicts({ initialGoalsConflicts, onUpdate }: SceneGoalsConflictsProps) {
  const [goalsConflicts, setGoalsConflicts] = useState<GoalConflict[]>(initialGoalsConflicts)

  const handleAdd = (type: 'goal' | 'conflict') => {
    const newItem: GoalConflict = {
      id: Date.now().toString(),
      type,
      content: ''
    }
    const updatedGoalsConflicts = [...goalsConflicts, newItem]
    setGoalsConflicts(updatedGoalsConflicts)
    onUpdate(updatedGoalsConflicts)
  }

  const handleRemove = (id: string) => {
    const updatedGoalsConflicts = goalsConflicts.filter(item => item.id !== id)
    setGoalsConflicts(updatedGoalsConflicts)
    onUpdate(updatedGoalsConflicts)
  }

  const handleChange = (id: string, content: string) => {
    const updatedGoalsConflicts = goalsConflicts.map(item =>
      item.id === id ? { ...item, content } : item
    )
    setGoalsConflicts(updatedGoalsConflicts)
    onUpdate(updatedGoalsConflicts)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Scene Goals</h3>
        {goalsConflicts.filter(item => item.type === 'goal').map((goal) => (
          <div key={goal.id} className="flex items-center space-x-2 mb-2">
            <Textarea
              value={goal.content}
              onChange={(e) => handleChange(goal.id, e.target.value)}
              placeholder="Enter scene goal..."
              className="flex-grow"
            />
            <Button size="icon" variant="ghost" onClick={() => handleRemove(goal.id)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={() => handleAdd('goal')}>
          <Plus className="mr-2 h-4 w-4" /> Add Goal
        </Button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Scene Conflicts</h3>
        {goalsConflicts.filter(item => item.type === 'conflict').map((conflict) => (
          <div key={conflict.id} className="flex items-center space-x-2 mb-2">
            <Textarea
              value={conflict.content}
              onChange={(e) => handleChange(conflict.id, e.target.value)}
              placeholder="Enter scene conflict..."
              className="flex-grow"
            />
            <Button size="icon" variant="ghost" onClick={() => handleRemove(conflict.id)}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button onClick={() => handleAdd('conflict')}>
          <Plus className="mr-2 h-4 w-4" /> Add Conflict
        </Button>
      </div>
    </div>
  )
}