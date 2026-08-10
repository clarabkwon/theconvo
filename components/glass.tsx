'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function GlassPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('glass rounded-3xl', className)}>{children}</div>
}

export function GlassButton({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'glass glass-hover glass-pill px-5 py-2.5 text-sm font-medium text-foreground cursor-pointer',
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

export function InkButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'ink-button rounded-full px-6 py-2.5 text-sm font-medium cursor-pointer',
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

export function GlassModal({
  children,
  onClose,
  className,
  labelledBy,
}: {
  children: ReactNode
  onClose: () => void
  className?: string
  labelledBy?: string
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-transparent"
      />
      <div
        className={cn(
          'glass glass-strong fade-up relative w-full max-w-xl rounded-3xl p-6 md:p-8',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass glass-hover absolute! right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-foreground/70 cursor-pointer"
        >
          <X className="relative z-10 h-4 w-4" aria-hidden="true" />
        </button>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
