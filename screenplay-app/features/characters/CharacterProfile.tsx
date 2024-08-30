import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Character } from '@/lib/types/types'

interface CharacterProfileProps {
  character: Character
  onUpdate: (updatedCharacter: Character) => void
}

export function CharacterProfile({ character, onUpdate }: CharacterProfileProps) {
  const [editedCharacter, setEditedCharacter] = useState<Character>(character)

  const handleChange = (field: keyof Character, value: string) => {
    setEditedCharacter({ ...editedCharacter, [field]: value })
  }

  const handleSave = () => {
    onUpdate(editedCharacter)
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={editedCharacter.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={editedCharacter.age}
            onChange={(e) => handleChange('age', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={editedCharacter.occupation}
            onChange={(e) => handleChange('occupation', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="background">Background</Label>
          <Textarea
            id="background"
            value={editedCharacter.background}
            onChange={(e) => handleChange('background', e.target.value)}
            rows={5}
          />
        </div>
        <div>
          <Label htmlFor="personality">Personality</Label>
          <Textarea
            id="personality"
            value={editedCharacter.personality}
            onChange={(e) => handleChange('personality', e.target.value)}
            rows={5}
          />
        </div>
        <div>
          <Label htmlFor="goals">Goals</Label>
          <Textarea
            id="goals"
            value={editedCharacter.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="conflicts">Conflicts</Label>
          <Textarea
            id="conflicts"
            value={editedCharacter.conflicts}
            onChange={(e) => handleChange('conflicts', e.target.value)}
            rows={3}
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </ScrollArea>
  )
}