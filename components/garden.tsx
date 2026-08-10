'use client'

import { ArrowLeft, X } from 'lucide-react'
import { useState } from 'react'
import { GlassPanel, InkButton } from '@/components/glass'
import { cn, assetPath } from '@/lib/utils'
import { flowerSrc, type Memory } from '@/lib/memories'

// Overlay controls that sit on top of the garden field.
export function GardenOverlay({
  memories,
  wandering,
  onBack,
  onPlant,
  onToggleWander,
  previewMemory,
  onDismissPreview,
  onOpenPreview,
  // When true, hide Wander deeper and Plant a memory (memory creation is open).
  hideFieldActions = false,
}: {
  memories: Memory[]
  wandering: boolean
  onBack: () => void
  onPlant: () => void
  onToggleWander: () => void
  previewMemory: Memory | null
  onDismissPreview: () => void
  onOpenPreview: (m: Memory) => void
  hideFieldActions?: boolean
}) {
  const [instructionsVisible] = useState(true)

  return (
    <div className="pointer-events-none relative z-10 flex min-h-svh flex-col px-4 py-5 md:px-8">
      {/* Top bar: back on the left, live count in the center. */}
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="glass glass-hover glass-pill pointer-events-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground cursor-pointer"
        >
          <ArrowLeft className="relative z-10 h-4 w-4" aria-hidden="true" />
          <span className="relative z-10">Garden gate</span>
        </button>

        <GlassPanel className="glass-pill pointer-events-auto px-5 py-2">
          <p className="relative z-10 text-sm font-medium text-foreground">
            Live memory count{' '}
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/80 px-1.5 text-xs font-semibold text-foreground">
              {memories.length}
            </span>
          </p>
        </GlassPanel>

        <div className="w-[7.5rem] shrink-0" aria-hidden="true" />
      </div>

      {instructionsVisible && !hideFieldActions && (
        <div className="mt-4 flex justify-center">
          <GlassPanel className="glass-pill px-5 py-2">
            <p className="relative z-10 text-xs text-foreground/75">
              {wandering
                ? 'You are deep in the garden. Touch a bloom to hear its memory.'
                : 'Each flower holds a memory and a song. Click one to open it.'}
            </p>
          </GlassPanel>
        </div>
      )}

      {/* Bottom actions stay off while the plant flow (screen three) is open. */}
      {!hideFieldActions && (
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pb-2">
          <button
            type="button"
            onClick={onToggleWander}
            className="glass glass-hover glass-pill pointer-events-auto px-5 py-2.5 text-sm font-medium text-foreground cursor-pointer"
          >
            <span className="relative z-10">
              {wandering ? 'Step back' : 'Wander deeper'}
            </span>
          </button>

          {previewMemory && (
            <GlassPanel className="fade-up pointer-events-auto relative w-56 rounded-2xl p-4">
              <button
                type="button"
                onClick={onDismissPreview}
                aria-label="Dismiss preview"
                className="absolute right-3 top-3 z-20 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <p className="relative z-10 text-xs font-medium text-muted-foreground">
                Minimal preview
              </p>
              <button
                type="button"
                onClick={() => onOpenPreview(previewMemory)}
                className="relative z-10 mt-1 flex w-full flex-col items-center cursor-pointer"
                aria-label={`Open memory: ${previewMemory.song.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flowerSrc(previewMemory.flower) || assetPath('/placeholder.svg')}
                  alt=""
                  width={90}
                  height={90}
                  className={cn('sketch-flower h-20 w-20 object-contain')}
                />
                <span className="mt-1 text-xs font-semibold text-foreground">
                  {previewMemory.song.title}
                </span>
              </button>
            </GlassPanel>
          )}

          <div className="pointer-events-auto">
            <InkButton onClick={onPlant}>Plant a memory</InkButton>
          </div>
        </div>
      )}
    </div>
  )
}
