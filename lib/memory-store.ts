import { promises as fs } from 'node:fs'
import path from 'node:path'
import { findSong, INITIAL_MEMORIES, type Memory, type Song } from '@/lib/memories'
import { hasSupabaseConfig, requireSupabaseAdmin } from '@/lib/supabase-server'

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

type DbPlantedRow = {
  id: string
  song_id: string
  message: string
  date: string
  flower: number
  x: number
  y: number
  size: number
}

function useSupabaseStore() {
  return hasSupabaseConfig()
}

function parsePlanted(raw: string): PlantedRow[] {
  const parsed = JSON.parse(raw) as PlantedRow[]
  return Array.isArray(parsed) ? parsed : []
}

function dbRowToPlanted(row: DbPlantedRow): PlantedRow {
  return {
    id: row.id,
    songId: row.song_id,
    message: row.message,
    date: row.date,
    flower: row.flower,
    x: row.x,
    y: row.y,
    size: row.size,
  }
}

function plantedToDbRow(row: PlantedRow): DbPlantedRow {
  return {
    id: row.id,
    song_id: row.songId,
    message: row.message,
    date: row.date,
    flower: row.flower,
    x: row.x,
    y: row.y,
    size: row.size,
  }
}

async function readPlantedFromFile(): Promise<PlantedRow[]> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8')
    return parsePlanted(raw)
  } catch {
    return []
  }
}

async function writePlantedToFile(rows: PlantedRow[]) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
  await fs.writeFile(STORE_PATH, JSON.stringify(rows, null, 2) + '\n', 'utf8')
}

async function readPlantedFromSupabase(): Promise<PlantedRow[]> {
  const supabase = requireSupabaseAdmin()
  const { data, error } = await supabase
    .from('planted_memories')
    .select('id, song_id, message, date, flower, x, y, size')
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map(dbRowToPlanted)
}

async function insertPlantedInSupabase(row: PlantedRow) {
  const supabase = requireSupabaseAdmin()
  const { error } = await supabase.from('planted_memories').insert(plantedToDbRow(row))
  if (error) {
    throw new Error(error.message)
  }
}

async function readPlanted(): Promise<PlantedRow[]> {
  if (useSupabaseStore()) return readPlantedFromSupabase()
  if (process.env.VERCEL) {
    throw new Error(
      'Supabase is not configured on Vercel. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your project settings, run supabase/planted-memories.sql in Supabase, then redeploy.',
    )
  }
  return readPlantedFromFile()
}

async function appendPlanted(row: PlantedRow) {
  if (useSupabaseStore()) {
    await insertPlantedInSupabase(row)
    return
  }
  if (process.env.VERCEL) {
    throw new Error(
      'Supabase is not configured on Vercel. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your project settings, run supabase/planted-memories.sql in Supabase, then redeploy.',
    )
  }
  const planted = await readPlantedFromFile()
  planted.push(row)
  await writePlantedToFile(planted)
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

  await appendPlanted(row)

  const memory = rowToMemory(row)
  if (!memory) throw new Error('Could not save this memory.')
  return memory
}
