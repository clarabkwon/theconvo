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

      {/* Landing: original painted flower field. */}
      {!isGarden && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${assetPath('/images/garden-field.png')})`,
            opacity: 0.75,
          }}
        />
      )}

      {/* Garden observe mode: sky and grass melt together with no hard horizon. */}
      {isGarden && (
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            filter: BLUR_BY_DEPTH[depth],
            transform: `scale(${SCALE_BY_DEPTH[depth]})`,
          }}
        >
          {/* One continuous wash from sky into meadow so there is no straight seam. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                #d4e4f0 0%,
                #dceaf2 14%,
                #e3edf0 26%,
                #e6efe6 38%,
                #dce8d0 48%,
                #cddfb8 58%,
                #b8d09a 72%,
                #a3c284 86%,
                #92b574 100%
              )`,
            }}
          />

          {/* Soft grass texture that fades in gradually from the mid sky. */}
          <div
            className="absolute inset-0 bg-cover bg-[center_70%]"
            style={{
              backgroundImage: `url(${assetPath('/images/garden-grass.png')})`,
              filter: 'saturate(0.28) brightness(1.14) contrast(0.9)',
              opacity: 0.38,
              mixBlendMode: 'multiply',
              // Soft top fade removes any hard edge where texture begins.
              WebkitMaskImage:
                'linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.15) 32%, rgba(0,0,0,0.55) 48%, black 68%, black 100%)',
              maskImage:
                'linear-gradient(180deg, transparent 0%, transparent 18%, rgba(0,0,0,0.15) 32%, rgba(0,0,0,0.55) 48%, black 68%, black 100%)',
            }}
          />

          {/* Extra haze band so green and blue dissolve into each other. */}
          <div
            className="absolute inset-x-0 top-[18%] h-[42%]"
            style={{
              background: `linear-gradient(
                180deg,
                rgba(212, 228, 240, 0.55) 0%,
                rgba(230, 238, 230, 0.35) 35%,
                rgba(200, 220, 170, 0.2) 70%,
                rgba(168, 196, 130, 0) 100%
              )`,
              filter: 'blur(18px)',
            }}
          />

          {/* Lower meadow depth without a sharp top cut. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                180deg,
                transparent 0%,
                transparent 40%,
                rgba(170, 196, 140, 0.18) 55%,
                rgba(140, 176, 110, 0.45) 72%,
                rgba(120, 158, 96, 0.72) 100%
              )`,
            }}
          />
        </div>
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
        // Invisible planting band: flowers stay in the grassy lower field.
        top: '38%',
        bottom: '10%',
      }}
    >
      {memories.map((m, i) => {
        const isFocus = focusId === m.id
        // Spread blooms naturally across the grass using their stored x and y.
        const left = 6 + (m.x / 100) * 88
        const top = 8 + (m.y / 100) * 72

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
