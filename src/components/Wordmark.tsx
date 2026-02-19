import { JSX } from 'react'

export default function Wordmark(): JSX.Element {
  return (
    <h1
      className="text-5xl sm:text-6xl font-black tracking-tight text-stone-900 dark:text-stone-100"
      aria-label="Simple Share logo"
      role="img"
    >
      Simple Share
    </h1>
  )
}
