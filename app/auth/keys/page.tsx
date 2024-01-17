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
  const { data, error, isLoading } = useSWR<{ keys: Array<ApiKey> }>(
    "/api/keys",
    fetcher
  )

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
      </div>
    </div>
  )
}
