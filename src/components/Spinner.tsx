'use client'

import React, { JSX } from 'react'
import { useRotatingSpinner } from '../hooks/useRotatingSpinner'

function TransferGlyph({ isRotating }: { isRotating?: boolean }): JSX.Element {
  return (
    <div
      className={`h-20 w-20 rounded-full border-2 border-stone-800/20 border-t-stone-800 dark:border-stone-100/25 dark:border-t-stone-100 ${
        isRotating ? 'animate-spin-slow' : ''
      }`}
      role="img"
      aria-label={isRotating ? 'Rotating transfer icon' : 'Transfer icon'}
    />
  )
}

export default function Spinner({
  direction = 'up',
}: {
  direction?: 'up' | 'down'
}): JSX.Element {
  void direction
  const isRotating = useRotatingSpinner()

  return <TransferGlyph isRotating={isRotating} />
}
