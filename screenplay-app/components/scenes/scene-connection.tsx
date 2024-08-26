import React from 'react'
import { Scene } from '@/lib/types'

interface SceneConnectionProps {
  scene1: Scene
  scene2: Scene
}

export function SceneConnection({ scene1, scene2 }: SceneConnectionProps) {
  const startX = scene1.position.x + 128 // Assuming scene block width is 256px
  const startY = scene1.position.y + 80 // Assuming scene block height is 160px
  const endX = scene2.position.x + 128
  const endY = scene2.position.y + 80

  const pathD = `M${startX},${startY} C${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <path
        d={pathD}
        fill="none"
        stroke="rgba(59, 130, 246, 0.5)"
        strokeWidth="2"
      />
    </svg>
  )
}