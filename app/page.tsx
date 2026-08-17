'use client'

import { useEffect, useState } from 'react'
import { GardenBackground, MemoryFlowers } from '@/components/garden-field'
import { GardenOverlay } from '@/components/garden'
import { Landing } from '@/components/landing'
import { PlantFlow } from '@/components/plant-flow'
import { FlowerDetail } from '@/components/flower-detail'
import { BackgroundMusic } from '@/components/background-music'
import { INITIAL_MEMORIES, type Memory, type Song } from '@/lib/memories'
import { assetPath } from '@/lib/utils'

function memoriesUrl() {
  return assetPath('/api/memories')
}

// Root page for The Memory Garden. It switches between landing and garden views.
export default function MemoryGardenPage() {
  const [view, setView] = useState<'landing' | 'garden'>('landing')
  const [wandering, setWandering] = useState(false)
  const [plantOpen, setPlantOpen] = useState(false)
  const [detail, setDetail] = useState<Memory | null>(null)
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES)
  // Keeps a small preview card open for one memory in the garden.
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [focusId, setFocusId] = useState<string | null>(null)
  // Brief success banner after a memory is planted.
  const [plantSuccess, setPlantSuccess] = useState<string | null>(null)

  const modalOpen = plantOpen || detail !== null

  // Progressive blur: 0 landing, 1 garden, 2 wandering, 3 modal open.
  const depth: 0 | 1 | 2 | 3 = modalOpen ? 3 : view === 'landing' ? 0 : wandering ? 2 : 1

  const previewMemory = previewIndex === null ? null : memories[previewIndex % memories.length]

  useEffect(() => {
    let cancelled = false
    async function loadMemories() {
      try {
        const res = await fetch(memoriesUrl())
        if (!res.ok) return
        const data = (await res.json()) as { memories?: Memory[] }
        if (!cancelled && Array.isArray(data.memories)) {
          setMemories(data.memories)
        }
      } catch {
        // Keep the starter flowers if the server store is not available yet.
      }
    }
    loadMemories()
    return () => {
      cancelled = true
    }
  }, [])

  // Saves a new anonymous memory flower on the server, then shows it in the field.
  async function handlePlanted(song: Song, message: string, flower: number) {
    try {
      const res = await fetch(memoriesUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: song.id, message, flower }),
      })
      const data = (await res.json()) as { memory?: Memory; error?: string }
      if (!res.ok || !data.memory) {
        setPlantSuccess(data.error || 'Could not plant this memory. Please try again.')
        window.setTimeout(() => setPlantSuccess(null), 3200)
        return
      }
      const planted = data.memory
      setMemories((prev) => [...prev, planted])
      setPlantOpen(false)
      setView('garden')
      setWandering(false)
      setFocusId(planted.id)
      setPreviewIndex(null)
      setPlantSuccess('Your memory is planted in the garden.')
      window.setTimeout(() => setPlantSuccess(null), 3200)
    } catch {
      setPlantSuccess('Could not plant this memory. Please try again.')
      window.setTimeout(() => setPlantSuccess(null), 3200)
    }
  }

  return (
    <div className="relative min-h-svh overflow-hidden">
      <GardenBackground depth={depth} />

      {view === 'garden' && (
        <MemoryFlowers
          memories={memories}
          onSelect={(m) => setDetail(m)}
          muted={modalOpen}
          focusId={focusId}
        />
      )}

      {view === 'landing' ? (
        <Landing
          onPlant={() => {
            setView('garden')
            setPlantOpen(true)
          }}
          onExplore={() => setView('garden')}
        />
      ) : (
        <GardenOverlay
          wandering={wandering}
          onBack={() => {
            setView('landing')
            setWandering(false)
            setFocusId(null)
          }}
          onPlant={() => setPlantOpen(true)}
          previewMemory={previewMemory}
          onDismissPreview={() => setPreviewIndex(null)}
          onOpenPreview={(m) => setDetail(m)}
          hideFieldActions={plantOpen}
        />
      )}

      {/* Success feedback after planting, with strong contrast for readability. */}
      {plantSuccess && (
        <div
          className="fade-up pointer-events-none fixed inset-x-0 top-6 z-[60] flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <p className="glass glass-strong rounded-full px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg">
            {plantSuccess}
          </p>
        </div>
      )}

      {plantOpen && (
        <PlantFlow onClose={() => setPlantOpen(false)} onPlanted={handlePlanted} />
      )}

      {detail && (
        <FlowerDetail
          memory={detail}
          onClose={() => setDetail(null)}
          onExploreSimilar={() => {
            setDetail(null)
            setWandering(true)
          }}
          onStartPlanting={() => {
            setDetail(null)
            setPlantOpen(true)
          }}
        />
      )}

      <BackgroundMusic />
    </div>
  )
}
