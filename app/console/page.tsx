import Link from "next/link"
import { topLevelSegment } from "./constants"

export default function PageAuth() {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-zinc-900 dark:text-zinc-100 sm:truncate sm:text-3xl sm:tracking-tight">
        Developer Console
      </h1>
      <p className="mt-4">
        Welcome to the developer console. Create and manage your API keys here:{" "}
        <Link
          className="font-semibold text-pink-600 dark:text-pink-400 hover:underline"
          href={`/${topLevelSegment}/keys`}
        >
          API Keys
        </Link>
      </p>
    </div>
  )
}
