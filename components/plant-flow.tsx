'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Disc3,
  Flower2,
  ListMusic,
  LoaderCircle,
  Music,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react'
import { GlassModal } from '@/components/glass'
import { cn, assetPath } from '@/lib/utils'
import { flowerSrc, sproutSrc, TYPING_EXAMPLE, type Song } from '@/lib/memories'
import {
  MOODS,
  SONG_CATALOG,
  songsForMood,
  type CatalogSong,
  type GriefMood,
} from '@/lib/songs'

// The four steps of planting a memory, in order.
type Step = 'song' | 'memory' | 'create' | 'plant'

const STEPS: Step[] = ['song', 'memory', 'create', 'plant']

const STEP_LABELS: Record<Step, string> = {
  song: 'Song',
  memory: 'Memory',
  create: 'Sprout',
  plant: 'Plant',
}

// Status messages shown for loading, errors, and success.
type Feedback =
  | { kind: 'idle' }
  | { kind: 'loading'; text: string }
  | { kind: 'error'; text: string }
  | { kind: 'success'; text: string }

export function PlantFlow({
  onClose,
  onPlanted,
}: {
  onClose: () => void
  onPlanted: (song: Song, message: string, flower: number) => void | Promise<void>
}) {
  // Current step in the planting flow. Going back keeps all typed data.
  const [step, setStep] = useState<Step>('song')
  const [song, setSong] = useState<Song | null>(null)
  const [message, setMessage] = useState('')
  const [showExample, setShowExample] = useState(false)
  const [flower, setFlower] = useState(() => 1 + Math.floor(Math.random() * 5))
  const [query, setQuery] = useState('')
  const [feedback, setFeedback] = useState<Feedback>({ kind: 'idle' })
  // Mood filters the song list. Start with longing for grief and loss.
  const [mood, setMood] = useState<GriefMood | 'all'>('longing')

  const stepIndex = STEPS.indexOf(step)

  // Songs come from the CSV catalog. Mood narrows the list. Search filters further.
  const moodSongs = mood === 'all' ? SONG_CATALOG : songsForMood(mood)
  const filtered = query
    ? moodSongs.filter((s) =>
        `${s.title} ${s.artist}`.toLowerCase().includes(query.toLowerCase()),
      )
    : moodSongs

  function pickSong(s: CatalogSong) {
    setSong({
      id: s.id,
      title: s.title,
      artist: s.artist,
      tint: s.tint,
      mood: s.mood,
    })
    setFeedback({ kind: 'idle' })
    setStep('memory')
  }

  // Moves one step back. Song and message stay filled in.
  function goBack() {
    setFeedback({ kind: 'idle' })
    if (step === 'song') {
      onClose()
      return
    }
    if (step === 'memory') setStep('song')
    if (step === 'create') setStep('memory')
    if (step === 'plant') setStep('create')
  }

  // Opens the bloom step after a short loading pause so feedback is clear.
  function handleBloom() {
    setFeedback({ kind: 'loading', text: 'Your sprout is blooming…' })
    window.setTimeout(() => {
      setFeedback({ kind: 'idle' })
      setStep('plant')
    }, 700)
  }

  // Plants the flower after a short loading pause, then shows success.
  function handlePlant() {
    if (!song) {
      setFeedback({ kind: 'error', text: 'Please choose a song before planting.' })
      return
    }
    setFeedback({ kind: 'loading', text: 'Planting your memory in the garden…' })
    window.setTimeout(() => {
      setFeedback({ kind: 'success', text: 'Your memory is planted. Welcome home.' })
      window.setTimeout(() => {
        onPlanted(song, message.trim(), flower)
      }, 650)
    }, 700)
  }

  // Moves from the memory step only when the text is not empty.
  function handleCreateFlower() {
    if (message.trim().length === 0) {
      setFeedback({
        kind: 'error',
        text: 'Please write a short memory before creating a flower.',
      })
      return
    }
    setFeedback({ kind: 'idle' })
    setStep('create')
  }

  const isBusy = feedback.kind === 'loading'

  // Sprout step uses a plain white panel, as noted in design feedback.
  const modalClass = cn(
    step === 'song' && 'max-w-3xl',
    step === 'create' && 'glass-solid',
  )

  return (
    <GlassModal onClose={onClose} labelledBy="plant-flow-title" className={modalClass}>
      {/* Progress indicator: four clear steps during memory creation. */}
      <div className="mb-6 pr-8" aria-label="Memory creation progress">
        <ol className="flex items-center justify-between gap-1">
          {STEPS.map((s, i) => {
            const done = i < stepIndex
            const current = i === stepIndex
            return (
              <li key={s} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                    done && 'bg-accent text-accent-foreground',
                    current && 'bg-foreground text-primary-foreground',
                    !done && !current && 'bg-white/70 text-muted-foreground',
                  )}
                  aria-current={current ? 'step' : undefined}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-medium uppercase tracking-wide sm:text-xs',
                    current ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {STEP_LABELS[s]}
                </span>
              </li>
            )
          })}
        </ol>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/60" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={stepIndex + 1} aria-label={`Step ${stepIndex + 1} of 4`}>
          <div
            className="h-full rounded-full bg-foreground/80 transition-all duration-500 motion-reduce:transition-none"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Shared status region for loading, error, and success messages. */}
      <div className="mb-4 min-h-6" aria-live="polite" role="status">
        {feedback.kind === 'loading' && (
          <p className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            {feedback.text}
          </p>
        )}
        {feedback.kind === 'error' && (
          <p className="rounded-xl bg-destructive/10 px-3 py-2 text-center text-sm font-medium text-destructive">
            {feedback.text}
          </p>
        )}
        {feedback.kind === 'success' && (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-accent/30 px-3 py-2 text-sm font-medium text-accent-foreground">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {feedback.text}
          </p>
        )}
      </div>

      {/* Back is always available and never clears song or message. */}
      <button
        type="button"
        onClick={goBack}
        disabled={isBusy}
        className="glass glass-hover glass-pill mb-4 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
        <span className="relative z-10">{step === 'song' ? 'Close' : 'Back'}</span>
      </button>

      {step === 'song' && (
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
          <div className="flex-1">
            <div className="text-center">
              <h2 id="plant-flow-title" className="font-serif text-3xl text-foreground">
                Choose the song
              </h2>
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                A song tied to the memory, so an old moment can keep its soundtrack.
              </p>
            </div>

            <label className="glass mt-5 flex items-center gap-2 rounded-full px-4 py-2.5">
              <Search className="relative z-10 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Select or search the song"
                className="relative z-10 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search for a song"
              />
            </label>

            <ul className="mt-4 flex max-h-52 flex-col gap-2.5 overflow-y-auto pr-1">
              {filtered.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => pickSong(s)}
                    className="glass glass-hover flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left cursor-pointer"
                  >
                    <span
                      className={cn(
                        'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                        s.tint,
                      )}
                    >
                      <Music className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                    </span>
                    <span className="relative z-10 flex-1">
                      <span className="block text-sm font-semibold text-foreground">{s.title}</span>
                      <span className="block text-xs text-muted-foreground">{s.artist}</span>
                    </span>
                    <ChevronDown className="relative z-10 h-4 w-4 rotate-[-90deg] text-muted-foreground" aria-hidden="true" />
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="py-4 text-center text-sm text-muted-foreground">
                  No songs found. Try another search or mood.
                </li>
              )}
            </ul>
          </div>

          <aside className="glass rounded-2xl p-4 md:w-52 md:self-start">
            <h3 className="relative z-10 text-sm font-semibold text-foreground">
              Mood
            </h3>
            <p className="relative z-10 mt-1 text-xs text-muted-foreground text-pretty">
              Pick a grief or loss mood to narrow the songs.
            </p>
            <ul className="relative z-10 mt-3 flex flex-col gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => setMood('all')}
                  className={cn(
                    'glass glass-hover flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left cursor-pointer',
                    mood === 'all' && 'ring-2 ring-foreground/30',
                  )}
                >
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80">
                    <Sparkles className="h-3 w-3 text-foreground/70" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 truncate text-xs font-medium text-foreground">
                    All moods
                  </span>
                </button>
              </li>
              {MOODS.map((m, i) => {
                const icons = [Disc3, ListMusic, BookOpen, Flower2, Music]
                const Icon = icons[i % icons.length]
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => setMood(m.id)}
                      title={m.hint}
                      className={cn(
                        'glass glass-hover flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left cursor-pointer',
                        mood === m.id && 'ring-2 ring-foreground/30',
                      )}
                    >
                      <span
                        className={cn(
                          'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                          songsForMood(m.id)[0]?.tint ?? 'bg-white/80',
                        )}
                      >
                        <Icon className="h-3 w-3 text-foreground/70" aria-hidden="true" />
                      </span>
                      <span className="relative z-10 truncate text-xs font-medium text-foreground">
                        {m.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="relative z-10 mt-3 text-xs text-muted-foreground">
              {filtered.length} song{filtered.length === 1 ? '' : 's'}
            </p>
          </aside>
        </div>
      )}

      {step === 'memory' && song && (
        <div className="flex flex-col items-center">
          <h2 id="plant-flow-title" className="font-serif text-3xl text-foreground">
            Write the memory
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {song.artist}
          </p>

          <div className="glass mt-5 w-full rounded-2xl p-1">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (feedback.kind === 'error') setFeedback({ kind: 'idle' })
              }}
              placeholder="Who were you with, where were you, and what did this song make you feel?"
              rows={5}
              className="relative z-10 w-full resize-none rounded-2xl bg-transparent p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
              aria-label="Write your memory"
            />
          </div>

          <div className="mt-5 flex w-full flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setFeedback({ kind: 'idle' })
                setStep('song')
              }}
              className="glass glass-hover glass-pill flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground cursor-pointer"
            >
              <ArrowLeft className="relative z-10 h-4 w-4" aria-hidden="true" />
              <span className="relative z-10">Change the song</span>
            </button>
            <button
              type="button"
              onClick={handleCreateFlower}
              className="ink-button rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer"
            >
              Create the flower
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowExample((v) => !v)}
            className="glass glass-hover glass-pill mt-5 px-5 py-2 text-xs font-medium text-muted-foreground cursor-pointer"
          >
            <span className="relative z-10">
              {showExample ? 'Hide typing example' : 'Typing example (pop up)'}
            </span>
          </button>
          {showExample && (
            <p className="fade-up mt-3 max-w-md text-center text-xs leading-relaxed text-muted-foreground text-pretty">
              {TYPING_EXAMPLE}
            </p>
          )}
        </div>
      )}

      {/* Pre bloom step shows a sprout. Bloom is centered. Edit memory is removed. */}
      {step === 'create' && song && (
        <div className="flex flex-col items-center">
          <h2 id="plant-flow-title" className="font-serif text-2xl text-foreground sm:text-3xl">
            Ready to bloom
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            Your memory is a sprout. Press Bloom when you are ready.
          </p>
          <div className="bloom-in mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sproutSrc()}
              alt="A sketched sprout grown from your memory, before it blooms"
              width={280}
              height={280}
              className="sketch-flower h-56 w-56 object-contain md:h-64 md:w-64"
            />
          </div>
          <div className="mt-6 flex w-full justify-center">
            <button
              type="button"
              onClick={handleBloom}
              disabled={isBusy}
              className="ink-button rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Bloom
            </button>
          </div>
        </div>
      )}

      {step === 'plant' && song && (
        <div className="flex flex-col items-center">
          <h2 id="plant-flow-title" className="font-serif text-2xl text-foreground sm:text-3xl">
            Plant the flower
          </h2>
          <p className="mt-1 text-sm text-muted-foreground text-pretty">
            This bloom is ready for the garden. You can try another if you like.
          </p>
          <div key={flower} className="bloom-in mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flowerSrc(flower) || assetPath('/placeholder.svg')}
              alt="Your fully bloomed sketched memory flower"
              width={300}
              height={300}
              className="sketch-flower h-56 w-56 object-contain md:h-72 md:w-72"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setFlower((f) => (f % 5) + 1)}
              disabled={isBusy}
              className="glass glass-hover glass-pill flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-foreground cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw className="relative z-10 h-4 w-4" aria-hidden="true" />
              <span className="relative z-10">Try another bloom</span>
            </button>
            <button
              type="button"
              onClick={handlePlant}
              disabled={isBusy}
              className="glass-hover rounded-full border border-white/70 bg-white px-6 py-2.5 text-sm font-semibold text-foreground shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Plant in the garden
            </button>
          </div>
        </div>
      )}
    </GlassModal>
  )
}
