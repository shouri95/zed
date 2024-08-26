import { type } from "os"

export interface Scene {
  storyPhase: string
  type: string
  id: string
  title: string
  content: string
  position: {
    x: number
    y: number
  }
  connections: string[]
  order: number
  color: string
  tags?: string[]
  characters: string[]
}

export interface Character {
  id: string
  name: string
  age: number
  occupation: string
  background: string
  personality: string
  goals: string
  conflicts: string
  arc: ArcPoint[]
  images: string[]
}

export interface Project {
  id: string
  title: string
  description: string
}

export interface ArcPoint {
  id: string
  sceneId: string
  description: string
  value: number
}

export interface Relationship {
  id: string
  character1Id: string
  character2Id: string
  type: string
  description: string
}

export interface Location {
  id: string
  name: string
  description: string
}