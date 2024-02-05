"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "components/dropdown"
import { Button } from "components/button"
import { topLevelSegment } from "./constants"

export default function UserDropdown() {
  const { user, error, isLoading } = useUser()

  if (error) return <div>{error.message}</div>

  if (isLoading) {
    return (
      <li className="-mx-6 mt-auto">
        <a
          href="#"
          className="flex items-center border-t gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
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
        <Dropdown>
          <DropdownButton as="button" className="w-full">
            <div className="flex border-t items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
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
              <span aria-hidden="true" className="truncate">
                {user.name}
              </span>
            </div>
          </DropdownButton>
          <DropdownMenu anchor="top end" className="z-50">
            <DropdownItem href="/api/auth/logout">Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    )
  }

  return (
    <li className="mt-auto mb-4">
      <Button
        href={`/api/auth/login?returnTo=${encodeURIComponent(
          `/${topLevelSegment}`
        )}`}
        className="w-full"
      >
        Login
      </Button>
    </li>
  )
}
