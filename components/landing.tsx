'use client'

import { GlassButton, InkButton } from '@/components/glass'

export function Landing({
  onPlant,
  onExplore,
}: {
  onPlant: () => void
  onExplore: () => void
}) {
  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center justify-end px-4 pb-16 md:pb-20">
      {/* Brand lives in the full-bleed art. CTAs sit below the composition. */}
      <section
        className="fade-up flex w-full max-w-md flex-col items-center gap-3"
        aria-label="Enter The Convo"
      >
        <p className="mb-2 text-center text-sm text-foreground/80 text-pretty">
          Share a song. Plant a flower. Keep the memory.
        </p>
        <InkButton onClick={onPlant}>Plant a memory</InkButton>
        <GlassButton onClick={onExplore}>
          <span className="font-semibold">Explore</span>
        </GlassButton>
      </section>
    </main>
  )
}
