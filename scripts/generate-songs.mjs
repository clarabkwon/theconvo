import { readFileSync, writeFileSync } from 'node:fs'

const raw = readFileSync('./data/songs.csv', 'utf8').trim().split(/\r?\n/)
const header = raw[0].split(',')
const rows = raw.slice(1).map((line) => {
  const parts = []
  let cur = ''
  let inQ = false
  for (const ch of line) {
    if (ch === '"') { inQ = !inQ; continue }
    if (ch === ',' && !inQ) { parts.push(cur); cur = ''; continue }
    cur += ch
  }
  parts.push(cur)
  return Object.fromEntries(header.map((h, i) => [h, parts[i]]))
})

const ts = `// Song catalog generated from data/songs.csv for grief and loss moods.
// Edit data/songs.csv, then run: node scripts/generate-songs.mjs

export type GriefMood = 'longing' | 'remembrance' | 'comfort' | 'farewell' | 'solitude'

export type CatalogSong = {
  id: string
  title: string
  artist: string
  mood: GriefMood
  tint: string
}

export const MOODS: { id: GriefMood; label: string; hint: string }[] = [
  { id: 'longing', label: 'Longing', hint: 'Missing someone deeply' },
  { id: 'remembrance', label: 'Remembrance', hint: 'Holding on to memories' },
  { id: 'comfort', label: 'Comfort', hint: 'Soft songs that hold you' },
  { id: 'farewell', label: 'Farewell', hint: 'Saying goodbye and letting go' },
  { id: 'solitude', label: 'Solitude', hint: 'Sitting with the quiet' },
]

export const SONG_CATALOG: CatalogSong[] = ${JSON.stringify(rows, null, 2)} as CatalogSong[]

export function songsForMood(mood: GriefMood | 'all') {
  if (mood === 'all') return SONG_CATALOG
  return SONG_CATALOG.filter((s) => s.mood === mood)
}

export function findSong(id: string) {
  return SONG_CATALOG.find((s) => s.id === id)
}
`

writeFileSync('./lib/songs.ts', ts)
console.log('Wrote lib/songs.ts with', rows.length, 'songs')
