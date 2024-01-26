"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/table"
import { ApiKey } from "./types"
import useSWR from "swr"
import { Button } from "components/button"
import { PlusIcon } from "@heroicons/react/16/solid"
import { useState } from "react"

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

const dummyItems: Array<ApiKey> = [
  {
    id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    createdAt: "YYYY-MM-DDThh:mm:ss.ZZZZ",
    roles: ["basic"],
  },
]

export default function Page() {
  const { data, error, isLoading, mutate } = useSWR<{ keys: Array<ApiKey> }>(
    "/api/keys",
    fetcher
  )
  const [createKeyError, setCreateKeyError] = useState<string | null>(null)

  if (error) return <div>Failed to find keys</div>

  const arr = isLoading ? dummyItems : data?.keys

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-zinc-900 dark:text-zinc-100 sm:truncate sm:text-3xl sm:tracking-tight">
        API Keys
      </h2>
      <div className="mt-12 max-w-screen-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Key</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Roles</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr?.map((item) => (
              <TableRow key={item.id} className="font-mono">
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.roles.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-2 flex justify-end">
          <div>
            {createKeyError ? (
              <div className="text-red-400 text-sm">{createKeyError}</div>
            ) : null}
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                fetch("/api/keys", { method: "POST" })
                  .then((res) => {
                    if (!res.ok) {
                      return res.json().then((payload) => {
                        throw new Error(payload?.error)
                      })
                    }
                    return res.json()
                  })
                  .then(({ key }: { key: ApiKey }) => {
                    setCreateKeyError(null)
                    mutate({ keys: [key, ...(data?.keys || [])] })
                  })
                  .catch((err) => {
                    setCreateKeyError("Failed to create key")
                    console.error(err.message || "Failed to create key")
                  })
              }}
            >
              <PlusIcon />
              New Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
