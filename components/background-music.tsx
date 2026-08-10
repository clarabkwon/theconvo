'use client'

import { useEffect, useRef, useState } from 'react'
import { Info, Volume2, VolumeX, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Credit required by the artist for using this track.
const TRACK = {
  title: 'In Dreamland',
  artist: 'Chillpeach',
  youtubeId: 'DSWYAclv2I8',
  url: 'https://youtu.be/DSWYAclv2I8',
  creditLine: 'Chillpeach - In Dreamland : https://youtu.be/DSWYAclv2I8',
}

type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setVolume: (volume: number) => void
  getVolume: () => number
  destroy: () => void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number; target: YTPlayer }) => void
          }
        },
      ) => YTPlayer
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

// Bottom music dock: play or mute, volume, and song credit info.
export function BackgroundMusic() {
  const playerRef = useRef<YTPlayer | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(35)
  const [infoOpen, setInfoOpen] = useState(false)

  useEffect(() => {
    let cancelled = false

    function createPlayer() {
      if (cancelled || !window.YT?.Player || playerRef.current) return
      playerRef.current = new window.YT.Player('memory-garden-bg-music', {
        videoId: TRACK.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          // Loop needs the playlist param set to the same video id.
          playlist: TRACK.youtubeId,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return
            event.target.setVolume(volume)
            event.target.mute()
            setReady(true)
          },
          onStateChange: (event) => {
            if (!window.YT) return
            if (event.data === window.YT.PlayerState.PLAYING) setPlaying(true)
            if (event.data === window.YT.PlayerState.PAUSED) setPlaying(false)
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      createPlayer()
    } else {
      const prior = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prior?.()
        createPlayer()
      }
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'youtube-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
    }

    return () => {
      cancelled = true
      try {
        playerRef.current?.destroy()
      } catch {
        // Player may already be gone on unmount.
      }
      playerRef.current = null
    }
    // Volume is applied in onReady from the initial state value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleMutePlay() {
    const player = playerRef.current
    if (!player || !ready) return

    // Browsers block autoplay with sound, so the first tap both starts and unmutes.
    if (!playing) {
      player.unMute()
      player.setVolume(volume)
      player.playVideo()
      setMuted(false)
      setPlaying(true)
      return
    }

    if (muted) {
      player.unMute()
      player.setVolume(volume)
      setMuted(false)
    } else {
      player.mute()
      setMuted(true)
    }
  }

  function handleVolume(next: number) {
    setVolume(next)
    const player = playerRef.current
    if (!player || !ready) return
    player.setVolume(next)
    if (next === 0) {
      player.mute()
      setMuted(true)
    } else if (muted && playing) {
      player.unMute()
      setMuted(false)
    }
  }

  return (
    <>
      {/* Offscreen YouTube player. Users control it from the dock below. */}
      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <div id="memory-garden-bg-music" />
      </div>

      <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex justify-end px-0 sm:bottom-5 sm:right-5">
        <div className="glass glass-strong pointer-events-auto flex items-center gap-2 rounded-full px-3 py-2 shadow-lg">
          <button
            type="button"
            onClick={toggleMutePlay}
            disabled={!ready}
            aria-label={
              !playing
                ? 'Play background music'
                : muted
                  ? 'Unmute background music'
                  : 'Mute background music'
            }
            className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-full text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!playing || muted ? (
              <VolumeX className="relative z-10 h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="relative z-10 h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <label className="relative z-10 flex items-center gap-2 px-1">
            <span className="sr-only">Background music volume</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
              disabled={!ready}
              className="h-1.5 w-24 cursor-pointer accent-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:w-28"
            />
          </label>

          <button
            type="button"
            onClick={() => setInfoOpen((v) => !v)}
            aria-expanded={infoOpen}
            aria-label="Song information and credit"
            className={cn(
              'glass glass-hover flex h-9 w-9 items-center justify-center rounded-full text-foreground cursor-pointer',
              infoOpen && 'ring-2 ring-foreground/25',
            )}
          >
            <Info className="relative z-10 h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {infoOpen && (
        <div className="fixed bottom-20 right-4 z-[70] flex justify-end sm:bottom-24 sm:right-5">
          <div
            className="glass glass-strong fade-up relative w-[min(100vw-2rem,24rem)] rounded-2xl p-4 shadow-lg"
            role="dialog"
            aria-labelledby="bg-music-credit-title"
          >
            <button
              type="button"
              onClick={() => setInfoOpen(false)}
              aria-label="Close song information"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <p id="bg-music-credit-title" className="relative z-10 font-serif text-lg text-foreground">
              {TRACK.title}
            </p>
            <p className="relative z-10 mt-1 text-sm text-muted-foreground">
              by {TRACK.artist}
            </p>
            <p className="relative z-10 mt-3 text-xs leading-relaxed text-foreground/80 text-pretty">
              Background music used with credit as requested by the artist:
            </p>
            <p className="relative z-10 mt-2 break-all text-xs font-medium text-foreground">
              {TRACK.creditLine}
            </p>
            <a
              href={TRACK.url}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 mt-3 inline-flex text-xs font-semibold text-foreground underline underline-offset-2"
            >
              Open on YouTube
            </a>
          </div>
        </div>
      )}
    </>
  )
}
