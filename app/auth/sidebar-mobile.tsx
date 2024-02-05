"use client"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  XMarkIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import UserDropdownMobile from "./user-dropdown-mobile"
import { useSelectedLayoutSegment } from "next/navigation"
import clsx from "clsx"
import { navigation, resources, topLevelSegment } from "./constants"

export default function SidebarMobile({}: {}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const segment = useSelectedLayoutSegment()
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
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
                                href={`/${topLevelSegment}/${
                                  item.segment || ""
                                }`}
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
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
        <UserDropdownMobile />
      </div>
    </>
  )
}
