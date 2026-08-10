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
