import React, { JSX } from 'react'

export default function ProgressBar({
  value,
  max,
}: {
  value: number
  max: number
}): JSX.Element {
  const percentage = (value / max) * 100
  const isComplete = value === max

  return (
    <div
      id="progress-bar"
      className="w-full h-12 bg-stone-300/70 dark:bg-stone-900 rounded-md overflow-hidden relative border border-stone-300 dark:border-stone-700"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-stone-900 dark:text-stone-100 font-bold">{Math.round(percentage)}%</span>
      </div>
      <div
        id="progress-bar-fill"
        className={`h-full ${
          isComplete
            ? 'bg-stone-900 dark:bg-stone-100'
            : 'bg-stone-700 dark:bg-stone-300'
        } transition-all duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          id="progress-percentage"
          className="text-stone-100 dark:text-stone-900 font-bold"
        >
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}
