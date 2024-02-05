"use client"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import UserDropdown from "./user-dropdown"
import clsx from "clsx"
import { navigation, resources } from "./constants"
import { useSelectedLayoutSegment } from "next/navigation"

export default function SidebarDesktop() {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <div className="flex h-16 shrink-0 items-center">
          {/* <img
                className="h-8 w-auto"
                alt="Your Company"
              /> */}
          <Link href="/" className="text-xl text-pink-500 font-bold">
            CharityBase
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/auth/${item.segment || ""}`}
                      className={clsx(
                        item.segment
                          ? item.segment === segment
                            ? "bg-gray-50 text-pink-600"
                            : "text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                          : "text-gray-700 opacity-30 pointer-events-none",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          item.segment
                            ? item.segment === segment
                              ? "text-pink-600"
                              : "text-gray-400 group-hover:text-pink-600"
                            : null,
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Resources
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {resources.map((item) => (
                  <li key={item.name}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.href}
                      className={clsx(
                        "text-gray-700 hover:text-pink-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          "text-gray-400 group-hover:text-pink-600",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      <span className="flex items-center">
                        <span>{item.name}</span>
                        <ArrowUpRightIcon className="ml-1 h-3 w-3" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <UserDropdown />
          </ul>
        </nav>
      </div>
    </div>
  )
}
