import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefix public asset paths for GitHub Pages (basePath) when needed.
export function assetPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  if (!path.startsWith('/')) return `${base}/${path}`
  return `${base}${path}`
}

// Opens a YouTube search for this song so the visitor can play it.
export function youtubeSearchUrl(title: string, artist: string) {
  const query = `${title} ${artist}`.trim()
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}
