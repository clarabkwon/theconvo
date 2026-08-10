'use client'

import { GlassButton, GlassPanel, InkButton } from '@/components/glass'

export function Landing({
  onPlant,
  onExplore,
}: {
  onPlant: () => void
  onExplore: () => void
}) {
  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center px-4">
      <header className="mt-6 md:mt-8">
        <GlassPanel className="glass-pill px-6 py-2.5">
          <h1 className="relative z-10 font-serif text-lg font-medium tracking-wide text-foreground">
            The Memory Garden
          </h1>
        </GlassPanel>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-8 pb-24">
        <GlassPanel className="fade-up max-w-2xl px-8 py-10 text-center md:px-14 md:py-12">
          <div className="relative z-10 flex flex-col gap-4">
            <p className="font-serif text-4xl leading-tight text-foreground text-balance md:text-6xl">
              A memory becomes lighter <em className="italic">when it is shared.</em>
            </p>
            <p className="text-sm text-muted-foreground text-pretty md:text-base">
              Share a song. Plant a flower. Keep the memory.
            </p>
          </div>
        </GlassPanel>

        <div className="fade-up flex flex-col items-center gap-3" style={{ animationDelay: '150ms' }}>
          <InkButton onClick={onPlant}>Plant a memory</InkButton>
          <GlassButton onClick={onExplore}>
            <span className="font-semibold">Explore</span>
          </GlassButton>
        </div>
      </section>
    </main>
  )
}
