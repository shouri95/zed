'use client'

import React from 'react'
import { CharacterManagement } from '@/components/characters/character-management'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { useProject } from '@/lib/contexts/ProjectContext'
import { useParams } from 'next/navigation'

function CharactersPage() {
  const { id } = useParams()
  const { currentProject } = useProject()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Character Management for {currentProject?.title}</h1>
      <CharacterManagement projectId={id as string} />
    </div>
  )
}

export default WithProjectProtection(CharactersPage)