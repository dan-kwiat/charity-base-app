"use client"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function UserDropdown() {
  const { user, error, isLoading } = useUser()

  if (error) return <div>{error.message}</div>

  if (isLoading) {
    return (
      <li className="-mx-6 mt-auto">
        <a
          href="#"
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        >
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">Loading...</span>
        </a>
      </li>
    )
  }

  if (user) {
    return (
      <li className="-mx-6 mt-auto">
        <a
          href="#"
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        >
          {user.picture ? (
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src={user.picture}
              width={32}
              height={32}
              alt={user.name ?? "Profile picture"}
            />
          ) : null}
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">{user.name}</span>
        </a>
        <a
          href="/api/auth/logout"
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        >
          Logout
        </a>
      </li>
    )
  }

  return (
    <li className="-mx-6 mt-auto">
      <a
        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
        href={`/api/auth/login?returnTo=${encodeURIComponent("/auth")}`}
      >
        Login
      </a>
    </li>
  )
}
