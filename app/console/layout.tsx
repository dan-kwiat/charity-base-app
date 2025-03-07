import { Metadata } from "next"
import SidebarMobile from "./sidebar-mobile"
import SidebarDesktop from "./sidebar-desktop"
import auth0 from "lib/auth0"
import { topLevelSegment, navigation } from "./constants"

export const metadata: Metadata = {
  title: "CharityBase API Console",
  description:
    "Explore resources, tutorials, API docs, and dynamic examples to get the most out of CharityBase's developer platform.",
}

function Page({ children }) {
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

export default auth0.withPageAuthRequired(
  // @ts-ignore
  Page,
  { returnTo: `/${topLevelSegment}/${navigation[0].segment}` }
)
