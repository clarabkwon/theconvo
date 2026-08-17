import { promises as fs } from 'node:fs'
import path from 'node:path'
import { findSong, INITIAL_MEMORIES, type Memory, type Song } from '@/lib/memories'

const STORE_PATH = path.join(process.cwd(), 'data', 'planted-memories.json')

type PlantedRow = {
  id: string
  songId: string
  message: string
  date: string
  flower: number
  x: number
  y: number
  size: number
}

async function readPlanted(): Promise<PlantedRow[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8')
    const parsed = JSON.parse(raw) as PlantedRow[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writePlanted(rows: PlantedRow[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(rows, null, 2) + '\n', 'utf8')
}

function rowToMemory(row: PlantedRow): Memory | null {
  const song = findSong(row.songId)
  if (!song) return null
  return {
    id: row.id,
    song,
    message: row.message,
    pseudonym: 'anonymous',
    date: row.date,
    flower: row.flower,
    x: row.x,
    y: row.y,
    size: row.size,
  }
}

export async function listMemories(): Promise<Memory[]> {
  const planted = await readPlanted()
  const extra = planted.map(rowToMemory).filter((m): m is Memory => m !== null)
  return [...INITIAL_MEMORIES, ...extra]
}

export async function plantMemory(input: {
  song: Song
  message: string
  flower: number
}): Promise<Memory> {
  const message = input.message.trim()
  if (!message) {
    throw new Error('Please write a short memory before planting.')
  }
  if (!findSong(input.song.id)) {
    throw new Error('That song is not in the catalog.')
  }
  const flower = Number(input.flower)
  if (!Number.isInteger(flower) || flower < 1 || flower > 5) {
    throw new Error('Please choose a flower bloom between 1 and 5.')
  }

  const now = new Date()
  const row: PlantedRow = {
    id: `planted-${now.getTime()}`,
    songId: input.song.id,
    message,
    date: now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    flower,
    x: 38 + Math.random() * 24,
    y: 30 + Math.random() * 20,
    size: 160,
  }

  const planted = await readPlanted()
  planted.push(row)
  await writePlanted(planted)

  const memory = rowToMemory(row)
  if (!memory) throw new Error('Could not save this memory.')
  return memory
}
