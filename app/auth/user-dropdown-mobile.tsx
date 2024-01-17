"use client"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function UserDropdownMobile() {
  const { user, error, isLoading } = useUser()

  if (error) return <div>{error.message}</div>

  if (isLoading)
    return (
      <a href="#">
        <span className="sr-only">Your profile</span>
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </a>
    )

  if (user) {
    return (
      <a href="#">
        <span className="sr-only">Your profile</span>
        {user.picture ? (
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src={user.picture}
            width={32}
            height={32}
            alt={user.name ?? "Profile picture"}
          />
        ) : null}
      </a>
    )
    // todo: allow logging out
  }

  return (
    <a
      className="text-sm font-semibold h-8 flex items-center px-2 leading-6 text-gray-900 hover:bg-gray-50"
      href={`/api/auth/login?returnTo=${encodeURIComponent("/auth")}`}
    >
      Login
    </a>
  )
}
