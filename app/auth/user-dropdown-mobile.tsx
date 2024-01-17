"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Button } from "components/button"
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "components/dropdown"

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
      <Dropdown>
        <DropdownButton as="button">
          <div className="h-8 w-8 rounded-full bg-gray-50">
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
          </div>
        </DropdownButton>
        <DropdownMenu anchor="bottom end" className="z-50">
          <DropdownItem href="/api/auth/logout">Log out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  return (
    <Button href={`/api/auth/login?returnTo=${encodeURIComponent("/auth")}`}>
      Login
    </Button>
  )
}
