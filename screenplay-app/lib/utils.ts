import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Scene } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScreenplayContent(content: string): string {
  const lines = content.split('\n')
  return lines.map(line => {
    if (line.startsWith('INT.') || line.startsWith('EXT.')) {
      return line.toUpperCase()
    } else if (line.trim().length > 0 && line === line.toUpperCase()) {
      return `    ${line}` // Character names
    } else if (line.startsWith('(')) {
      return `  ${line}` // Parentheticals
    } else if (line.includes('FADE IN:') || line.includes('FADE OUT.') || line.includes('CUT TO:')) {
      return `\n${line.toUpperCase()}\n` // Transitions
    } else {
      return `        ${line}` // Action and dialogue
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