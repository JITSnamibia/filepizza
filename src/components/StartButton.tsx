import React from 'react'

export default function StartButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}): React.ReactElement {
  return (
    <button
      id="start-button"
      onClick={onClick}
      className="px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-all duration-200 shadow-sm"
    >
      Start
    </button>
  )
}
