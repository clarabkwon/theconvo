'use client'

import { cn, assetPath } from '@/lib/utils'
import { flowerSrc, type Memory } from '@/lib/memories'

// Blur amount grows as the visitor goes deeper into the garden.
// Depth 0 is the landing page. Depth 1 is the open garden.
// Depth 2 is wander mode. Depth 3 is when a popup is open.
const BLUR_BY_DEPTH = ['blur(0px)', 'blur(2px)', 'blur(5px)', 'blur(12px)']
const SCALE_BY_DEPTH = [1, 1.02, 1.04, 1.08]

// Full screen scene behind all other UI.
export function GardenBackground({ depth }: { depth: 0 | 1 | 2 | 3 }) {
  const isGarden = depth >= 1

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      {/* Landing: The Convo title-card art, full-bleed. */}
      {!isGarden && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${assetPath('/images/the-convo-front.jpg')})`,
            opacity: 1,
          }}
        />
      )}

      {/* Garden field: sky-and-grass painting for planted memories. */}
      {isGarden && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${assetPath('/images/the-convo-garden.jpg')})`,
            filter: BLUR_BY_DEPTH[depth],
            transform: `scale(${SCALE_BY_DEPTH[depth]})`,
          }}
        />
      )}

      {/* Soft wash when a modal is open, for readable contrast. */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          depth >= 3 ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background:
            'linear-gradient(180deg, rgba(230,240,248,0.5) 0%, rgba(235,240,235,0.35) 100%)',
        }}
      />
    </div>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

// Spread blooms across the grass in staggered columns so they do not pile in the center.
function flowerSlot(index: number, total: number, memory: Memory) {
  const columns = Math.min(Math.max(total, 1), 9)
  const col = index % columns
  const row = Math.floor(index / columns)
  const colT = columns === 1 ? 0.5 : col / (columns - 1)
  const jitterX = ((memory.x % 13) - 6.5) * 0.45
  const jitterY = ((memory.y % 11) - 5.5) * 0.9
  return {
    left: clamp(7 + colT * 86 + jitterX, 5, 95),
    top: clamp(42 + row * 16 + (col % 2) * 6 + jitterY, 36, 78),
  }
}

// Memory flowers rest on the open grass. Placement stays inside an invisible band.
export function MemoryFlowers({
  memories,
  onSelect,
  muted,
  focusId,
}: {
  memories: Memory[]
  onSelect: (memory: Memory) => void
  muted: boolean
  focusId?: string | null
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-[5]"
      style={{
        // Invisible planting band: flowers sit in the grassy lower field, not the sky.
        top: '52%',
        bottom: '4%',
      }}
    >
      {memories.map((m, i) => {
        const isFocus = focusId === m.id
        const { left, top } = flowerSlot(i, memories.length, m)

        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m)}
            className={cn(
              'group pointer-events-auto absolute -translate-x-1/2 cursor-pointer bg-transparent transition-all duration-500',
              muted && !isFocus && 'opacity-60',
              isFocus && 'z-10',
            )}
            style={{ left: `${left}%`, top: `${top}%` }}
            aria-label={`Open memory flower: ${m.song.title} by ${m.song.artist}`}
          >
            <span
              className={cn('block flower-sway', isFocus && 'bloom-in')}
              style={{ animationDelay: isFocus ? '0ms' : `${(i % 5) * 700}ms` }}
            >
              {/* Soft ground shadow so each flower feels rooted in the grass. */}
              <span
                className="pointer-events-none absolute left-1/2 top-[90%] h-2.5 w-[50%] -translate-x-1/2 rounded-[100%] bg-foreground/12 blur-[4px]"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flowerSrc(m.flower) || assetPath('/placeholder.svg')}
                alt=""
                width={m.size}
                height={m.size}
                className={cn(
                  'sketch-flower relative transition-transform duration-300 group-hover:scale-110',
                  isFocus && 'drop-shadow-[0_0_24px_rgba(255,255,255,0.9)]',
                )}
                style={{ width: m.size, height: m.size, objectFit: 'contain' }}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
