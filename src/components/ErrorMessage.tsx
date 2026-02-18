import { JSX } from 'react'

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  return (
    <div
      className="bg-stone-200 dark:bg-stone-800 border border-stone-400 dark:border-stone-600 text-stone-800 dark:text-stone-200 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  )
}
