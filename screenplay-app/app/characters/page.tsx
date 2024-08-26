import React from 'react'
import { CharacterManagement } from '@/components/characters/character-management'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { useProject } from '@/lib/contexts/ProjectContext'

function CharactersPage() {
  const { currentProject } = useProject()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Character Management for {currentProject?.title}</h1>
      <CharacterManagement projectId={currentProject?.id || ''} />
    </div>
  )
}

export default WithProjectProtection(CharactersPage)