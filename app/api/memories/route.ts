import { NextResponse } from 'next/server'
import { findSong } from '@/lib/memories'
import { listMemories, plantMemory } from '@/lib/memory-store'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const memories = await listMemories()
    return NextResponse.json({ memories })
  } catch (error) {
    const text = error instanceof Error ? error.message : 'Could not load memories.'
    return NextResponse.json({ error: text }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      songId?: string
      message?: string
      flower?: number
    }
    const song = body.songId ? findSong(body.songId) : undefined
    if (!song) {
      return NextResponse.json({ error: 'Please choose a song before planting.' }, { status: 400 })
    }
    const memory = await plantMemory({
      song,
      message: body.message ?? '',
      flower: Number(body.flower),
    })
    return NextResponse.json({ memory }, { status: 201 })
  } catch (error) {
    const text = error instanceof Error ? error.message : 'Could not plant this memory.'
    const status = text.startsWith('Please') || text.startsWith('That song') ? 400 : 500
    return NextResponse.json({ error: text }, { status })
  }
}
