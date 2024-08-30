'use client';

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterProfile } from './CharacterProfile'
import { CharacterArc } from './CharacterArc'
import { CharacterRelationships } from './CharacterRelationships'
import { CharacterDialogueStats } from './CharacterDialogueStats'
import { CharacterGallery } from './CharacterGallery'
import { Character, Scene, Relationship } from '@/lib/types/types'

// ... rest of the component remains the same

interface CharacterManagementProps {
  projectId: string
}

export function CharacterManagement({ projectId }: CharacterManagementProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [scenes, setScenes] = useState<Scene[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  useEffect(() => {
    // Fetch characters, scenes, and relationships for the project
    // This is where you'd typically make API calls
    // For now, we'll use dummy data
    setCharacters([
      { id: '1', name: 'John Doe', age: 30, occupation: 'Detective', background: '...', personality: '...', goals: '...', conflicts: '...', arc: [], images: [] },
      { id: '2', name: 'Jane Smith', age: 28, occupation: 'Lawyer', background: '...', personality: '...', goals: '...', conflicts: '...', arc: [], images: [] },
    ])
    setScenes([
      { id: '1', title: 'Opening Scene', content: 'JOHN DOE\nHello, world!', order: 1, position: { x: 0, y: 0 }, connections: [], color: '#ffffff', tags: [] },
      { id: '2', title: 'Climax', content: 'JANE SMITH\nCase closed!', order: 2, position: { x: 200, y: 0 }, connections: [], color: '#ffffff', tags: [] },
    ])
    setRelationships([
      { id: '1', character1Id: '1', character2Id: '2', type: 'Colleagues', description: 'Work together on cases' },
    ])
  }, [projectId])

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacters(characters.map(char => 
      char.id === updatedCharacter.id ? updatedCharacter : char
    ))
    setSelectedCharacter(updatedCharacter)
  }

  const handleRelationshipsUpdate = (updatedRelationships: Relationship[]) => {
    setRelationships(updatedRelationships)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Character Management</h2>
        <Button onClick={() => {/* Add new character logic */}}>Add Character</Button>
      </div>
      <div className="flex">
        <div className="w-1/4 pr-4">
          {characters.map(character => (
            <Button
              key={character.id}
              onClick={() => setSelectedCharacter(character)}
              variant={selectedCharacter?.id === character.id ? 'default' : 'outline'}
              className="w-full mb-2"
            >
              {character.name}
            </Button>
          ))}
        </div>
        <div className="w-3/4">
          {selectedCharacter && (
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="arc">Character Arc</TabsTrigger>
                <TabsTrigger value="relationships">Relationships</TabsTrigger>
                <TabsTrigger value="dialogue">Dialogue Stats</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <CharacterProfile
                  character={selectedCharacter}
                  onUpdate={handleCharacterUpdate}
                />
              </TabsContent>
              <TabsContent value="arc">
                <CharacterArc
                  character={selectedCharacter}
                  onUpdate={handleCharacterUpdate}
                />
              </TabsContent>
              <TabsContent value="relationships">
                <CharacterRelationships
                  characters={characters}
                  relationships={relationships}
                  onUpdate={handleRelationshipsUpdate}
                />
              </TabsContent>
              <TabsContent value="dialogue">
                <CharacterDialogueStats
                  character={selectedCharacter}
                  scenes={scenes}
                />
              </TabsContent>
              <TabsContent value="gallery">
                <CharacterGallery
                  character={selectedCharacter}
                  onUpdate={handleCharacterUpdate}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}