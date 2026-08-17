'use client'

import { useState } from 'react'
import { Music, Sprout } from 'lucide-react'
import { GlassModal } from '@/components/glass'
import { cn, assetPath, youtubeSearchUrl } from '@/lib/utils'
import { flowerSrc, type Memory } from '@/lib/memories'

// Shows one memory flower in detail. Posts stay anonymous on purpose.
export function FlowerDetail({
  memory,
  onClose,
  onExploreSimilar,
  onStartPlanting,
}: {
  memory: Memory
  onClose: () => void
  onExploreSimilar: () => void
  onStartPlanting: () => void
}) {
  // Switches between the message view and the next steps view.
  const [view, setView] = useState<'detail' | 'suggestions'>('detail')

  return (
    <GlassModal onClose={onClose} labelledBy="flower-detail-title" className="max-w-lg">
      {view === 'detail' ? (
        <div className="flex flex-col">
          {/* Song icon and title open YouTube. Artist stays plain text. */}
          <div className="flex items-center gap-3">
            <a
              href={youtubeSearchUrl(memory.song.title, memory.song.artist)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Listen to ${memory.song.title} by ${memory.song.artist} on YouTube`}
              className="flex min-w-0 items-center gap-3"
            >
              <span
                className={cn(
                  'relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl',
                  memory.song.tint,
                )}
              >
                <Music className="h-5 w-5 text-foreground/70" aria-hidden="true" />
              </span>
              <h2
                id="flower-detail-title"
                className="text-base font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {memory.song.title}
              </h2>
            </a>
          </div>
          <p className="mt-1 pl-[3.75rem] text-sm text-muted-foreground">
            {memory.song.artist}
          </p>

          {/* The shared memory text lives in this glass box. */}
          <div className="glass mt-5 rounded-2xl p-5">
            <p className="relative z-10 text-sm leading-relaxed text-foreground/90 text-pretty">
              {memory.message}
            </p>
          </div>

          {/* Footer only shows the date and a small flower. No author label. */}
          <div className="mt-5 flex items-center justify-end gap-3 border-t border-white/50 pt-4">
            <span className="text-xs text-muted-foreground">{memory.date}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flowerSrc(memory.flower) || assetPath('/placeholder.svg')}
              alt=""
              width={36}
              height={36}
              className="sketch-flower h-9 w-9 object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() => setView('suggestions')}
            className="glass glass-hover glass-pill mt-5 self-center px-5 py-2 text-xs font-medium text-foreground/80 cursor-pointer"
          >
            <span className="relative z-10">Keep wandering</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 id="flower-detail-title" className="sr-only">
            Where to next
          </h2>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="glass flex flex-col items-center rounded-2xl p-5 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flowerSrc((memory.flower % 5) + 1) || assetPath('/placeholder.svg')}
                alt=""
                width={110}
                height={110}
                className="sketch-flower h-24 w-24 object-contain"
              />
              <h3 className="relative z-10 mt-3 text-sm font-semibold text-foreground">
                Explore similar flowers
              </h3>
              <p className="relative z-10 mt-1 text-xs text-muted-foreground text-pretty">
                Wander deeper into blooms tied to the same feeling.
              </p>
              <button
                type="button"
                onClick={onExploreSimilar}
                className="glass glass-hover glass-pill relative z-10 mt-4 px-4 py-2 text-xs font-semibold text-foreground cursor-pointer"
              >
                <span className="relative z-10">Explore flowers</span>
              </button>
            </div>

            <div className="glass flex flex-col items-center rounded-2xl p-5 text-center">
              <span className="flex h-24 w-24 items-center justify-center">
                <Sprout className="h-14 w-14 text-accent" aria-hidden="true" />
              </span>
              <h3 className="relative z-10 mt-3 text-sm font-semibold text-foreground">
                Start to plant your own
              </h3>
              <p className="relative z-10 mt-1 text-xs text-muted-foreground text-pretty">
                A song, a moment, and a seed of your own memory.
              </p>
              <button
                type="button"
                onClick={onStartPlanting}
                className="glass glass-hover glass-pill relative z-10 mt-4 px-4 py-2 text-xs font-semibold text-foreground cursor-pointer"
              >
                <span className="relative z-10">Start and plant</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </GlassModal>
  )
}
