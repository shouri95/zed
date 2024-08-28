// lib/types.ts

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
  progress: number
  status: 'active' | 'completed'
  image: string  // Add this line
  lastEdited?: string  // Add this line
  completed?: string  // Add this line
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

export interface Task {
  id: number
  title: string
  project: string
  dueDate: string
  status: 'in-progress' | 'pending'
}

export interface ActivityData {
  date: string
  words: number
}

export interface OverviewStat {
  title: string
  value: string
}