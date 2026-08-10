'use client'

import { cn, assetPath } from '@/lib/utils'
import { flowerSrc, type Memory } from '@/lib/memories'

// Blur amount grows as the visitor goes deeper into the garden.
// Depth 0 is the landing page. Depth 1 is the open garden.
// Depth 2 is wander mode. Depth 3 is when a popup is open.
const BLUR_BY_DEPTH = ['blur(0px)', 'blur(2px)', 'blur(5px)', 'blur(12px)']
const SCALE_BY_DEPTH = [1, 1.02, 1.04, 1.08]

// Full screen scene behind all other UI.
// Landing keeps the painted flower field (with lower vibrancy).
// The garden view is a natural grass field with no visible platform shape.
export function GardenBackground({ depth }: { depth: 0 | 1 | 2 | 3 }) {
  const isGarden = depth >= 1

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      {/* Landing hero: painted flowers, vibrancy turned down. */}
      {!isGarden && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{
            backgroundImage: `url(${assetPath('/images/garden-field.png')})`,
            filter: 'saturate(0.45) brightness(1.08) contrast(0.92)',
            opacity: 0.85,
          }}
        />
      )}

      {/* Garden observe mode: continuous sky into grass. No shaped bed. */}
      {isGarden && (
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            filter: BLUR_BY_DEPTH[depth],
            transform: `scale(${SCALE_BY_DEPTH[depth]})`,
          }}
        >
          {/* Soft sky fading into distant meadow. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #cfe0ec 0%, #dde9ef 22%, #e6efe4 40%, #d4e3c4 58%, #b8ce9a 78%, #9fb87e 100%)',
            }}
          />

          {/* Quiet grass texture across the lower field, heavily desaturated. */}
          <div
            className="absolute inset-x-0 bottom-0 top-[24%] bg-cover bg-[center_65%]"
            style={{
              backgroundImage: `url(${assetPath('/images/garden-grass.png')})`,
              filter: 'saturate(0.3) brightness(1.15) contrast(0.88)',
              opacity: 0.42,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Natural grass color that blends with no hard edges. */}
          <div
            className="absolute inset-x-0 bottom-0 top-[34%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(200, 214, 170, 0) 0%, rgba(170, 192, 138, 0.45) 18%, rgba(148, 176, 118, 0.75) 45%, rgba(126, 158, 100, 0.9) 100%)',
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
