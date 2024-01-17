import { Metadata } from "next"
import { Roboto } from "next/font/google"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import clsx from "clsx"
import "index.css"

export const metadata: Metadata = {
  title: "CharityBase",
  description: "The database of charities",
}

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
})

// <link
//   href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,700;1,400&amp;display=swap"
//   rel="stylesheet"
// />

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx("h-full bg-white", roboto.className)}>
      <UserProvider>
        <body className="h-full dark:bg-zinc-800 dark:text-zinc-100">
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
