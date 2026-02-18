import React, { JSX } from 'react'

export default function DownloadButton({
  onClick,
}: {
  onClick?: React.MouseEventHandler
}): JSX.Element {
  return (
    <button
      id="download-button"
      onClick={onClick}
      className="h-12 px-4 rounded-md border border-stone-300 dark:border-stone-600 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-all duration-200 shadow-sm"
    >
      Download
    </button>
  )
}
