import React from "react"
import { UserProvider } from "@auth0/nextjs-auth0/client"

export default function App({ children }) {
  return (
    <UserProvider>
      <body>{children}</body>
    </UserProvider>
  )
}
