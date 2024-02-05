import { Metadata } from "next"
import SidebarMobile from "./sidebar-mobile"
import SidebarDesktop from "./sidebar-desktop"

export const metadata: Metadata = {
  title: "CharityBase API Console",
  description:
    "Explore resources, tutorials, API docs, and dynamic examples to get the most out of CharityBase's developer console.",
}

export default function Page({ children }) {
  return (
    <div>
      <SidebarMobile />
      <SidebarDesktop />
      <main className="py-6 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
