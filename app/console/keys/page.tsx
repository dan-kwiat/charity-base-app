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
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid"
import { useEffect, useState } from "react"
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertTitle,
} from "components/alert"
import { ErrorMessage, Field, Label } from "components/fieldset"
import { Input } from "components/input"

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

const dummyItems: Array<ApiKey> = [
  {
    id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    createdAt: "YYYY-MM-DDThh:mm:ss.ZZZZ",
    roles: ["basic"],
  },
]

function DeleteKeyAlert({
  keyId,
  onDelete,
}: {
  keyId: string
  onDelete: () => void
}) {
  let [isOpen, setIsOpen] = useState(false)
  let [mismatch, setMismatch] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setMismatch(false)
    }
  }, [isOpen])

  return (
    <>
      <Button plain type="button" onClick={() => setIsOpen(true)}>
        <TrashIcon />
      </Button>
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Are you sure you want to delete this key?</AlertTitle>
        <AlertDescription>
          This process is irreversible and any applications using this key will
          stop working.
        </AlertDescription>
        <Field className="mt-4">
          <Label>Confirm API Key</Label>
          <Input name="api_key_id" invalid={mismatch} autoComplete="off" />
          {mismatch ? (
            <ErrorMessage>API key does not match</ErrorMessage>
          ) : null}
        </Field>
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              const textInput = document.querySelector(
                "input[name=api_key_id]"
              ) as HTMLInputElement
              if (textInput.value.trim() !== keyId) {
                setMismatch(true)
                return
              }
              onDelete()
              setIsOpen(false)
            }}
          >
            Delete key
          </Button>
        </AlertActions>
      </Alert>
    </>
  )
}

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
      <h1 className="text-2xl font-bold leading-7 text-zinc-900 dark:text-zinc-100 sm:truncate sm:text-3xl sm:tracking-tight">
        API Keys
      </h1>
      <div className="mt-12 max-w-screen-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Key</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Roles</TableHeader>
              <TableHeader>Delete</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr?.map((item) => (
              <TableRow key={item.id} className="font-mono">
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.roles.join(", ")}</TableCell>
                <TableCell>
                  <DeleteKeyAlert
                    keyId={item.id}
                    onDelete={() => {
                      fetch(`/api/keys/${item.id}`, { method: "DELETE" })
                        .then((res) => {
                          if (!res.ok) {
                            return res.json().then((payload) => {
                              throw new Error(payload?.error)
                            })
                          }
                          return res.json()
                        })
                        .then(() => {
                          mutate({
                            keys: (data?.keys || []).filter(
                              (key) => key.id !== item.id
                            ),
                          })
                        })
                        .catch((err) => {
                          console.error(err.message || "Failed to delete key")
                        })
                    }}
                  />
                </TableCell>
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
