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

function hashString(value: string) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Irregular patches, like wildflowers, not a straight row.
const GRASS_PATCHES: Array<[number, number]> = [
  [14, 58],
  [28, 36],
  [41, 64],
  [53, 42],
  [66, 70],
  [78, 38],
  [88, 56],
  [22, 78],
  [60, 28],
]

function layoutFlowers(memories: Memory[]) {
  return memories
    .map((memory, index) => {
      const rnd = mulberry32(hashString(memory.id))
      const patch = GRASS_PATCHES[hashString(memory.id) % GRASS_PATCHES.length]
      const left = clamp(patch[0] + (rnd() - 0.5) * 26, 6, 94)
      const top = clamp(patch[1] + (rnd() - 0.5) * 22, 22, 84)
      const depth = (top - 22) / 62
      const size = Math.round((memory.size || 140) * (0.68 + depth * 0.5 + (rnd() - 0.5) * 0.12))
      return { memory, index, left, top, size, z: Math.round(top * 10) }
    })
    .sort((a, b) => a.top - b.top)
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
  const laidOut = layoutFlowers(memories)

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-[5]"
      style={{
        // Invisible planting band: flowers sit in the grassy lower field, not the sky.
        top: '48%',
        bottom: '2%',
      }}
    >
      {laidOut.map(({ memory: m, index: i, left, top, size, z }) => {
        const isFocus = focusId === m.id

        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m)}
            className={cn(
              'group pointer-events-auto absolute -translate-x-1/2 cursor-pointer bg-transparent transition-all duration-500',
              muted && !isFocus && 'opacity-60',
              isFocus && 'z-20',
            )}
            style={{ left: `${left}%`, top: `${top}%`, zIndex: isFocus ? 20 : z }}
            aria-label={`Open memory flower: ${m.song.title} by ${m.song.artist}`}
          >
            <span
              className={cn('block flower-sway', isFocus && 'bloom-in')}
              style={{ animationDelay: isFocus ? '0ms' : `${(i % 7) * 420}ms` }}
            >
              {/* Soft ground shadow so each flower feels rooted in the grass. */}
              <span
                className="pointer-events-none absolute left-1/2 top-[90%] h-2.5 w-[50%] -translate-x-1/2 rounded-[100%] bg-foreground/18 blur-[4px]"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flowerSrc(m.flower) || assetPath('/placeholder.svg')}
                alt=""
                width={size}
                height={size}
                className={cn(
                  'sketch-flower relative transition-transform duration-300 group-hover:scale-110',
                  isFocus && 'drop-shadow-[0_0_24px_rgba(255,255,255,0.9)]',
                )}
                style={{ width: size, height: size, objectFit: 'contain' }}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
