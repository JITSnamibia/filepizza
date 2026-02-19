import React, { JSX } from 'react'

function getTypeColor(fileType: string): string {
  if (fileType.startsWith('image/'))
    return 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100'
  if (fileType.startsWith('text/'))
    return 'bg-stone-300 dark:bg-stone-600 text-stone-800 dark:text-stone-100'
  if (fileType.startsWith('audio/'))
    return 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100'
  if (fileType.startsWith('video/'))
    return 'bg-stone-300 dark:bg-stone-600 text-stone-800 dark:text-stone-100'
  return 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100'
}

export default function TypeBadge({ type }: { type: string }): JSX.Element {
  return (
    <div
      className={`px-2 py-1 text-[10px] font-semibold rounded ${getTypeColor(
        type,
      )} transition-all duration-300`}
    >
      {type}
    </div>
  )
}
