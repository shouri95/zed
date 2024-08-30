import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Scene } from "../types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScreenplayContent(content: string): string {
  const lines = content.split('\n')
  return lines.map(line => {
    if (line.trim().startsWith('INT.') || line.trim().startsWith('EXT.')) {
      return line.trim().toUpperCase()
    } else if (line.trim() === line.trim().toUpperCase() && line.trim().length > 0) {
      return `\n${line.trim()}\n` // Character names
    } else if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
      return `  ${line.trim()}` // Parentheticals
    } else if (['FADE IN:', 'FADE OUT.', 'CUT TO:'].includes(line.trim().toUpperCase())) {
      return `\n${line.trim().toUpperCase()}\n` // Transitions
    } else {
      return `    ${line.trim()}` // Action and dialogue
    }
  }).join('\n')
}

export function estimatePageCount(scenes: Scene[]): number {
  const totalWords = scenes.reduce((count, scene) => count + scene.content.split(/\s+/).length, 0)
  return Math.ceil(totalWords / 250) // Assuming about 250 words per page
}

export function autoCompleteCharacter(input: string, characters: string[]): string[] {
  return characters.filter(char => char.toLowerCase().startsWith(input.toLowerCase()))
}

export function autoCompleteLocation(input: string, locations: string[]): string[] {
  return locations.filter(loc => loc.toLowerCase().startsWith(input.toLowerCase()))
}