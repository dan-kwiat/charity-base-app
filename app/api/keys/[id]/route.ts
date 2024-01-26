import auth0 from "lib/auth0"
import { NextResponse } from "next/server"
import { deleteKey } from "../helper"

export const DELETE = auth0.withApiAuthRequired(async function DELETE(
  req,
  { params }
) {
  const res = new NextResponse()
  const session = await auth0.getSession(req, res)
  const sub = session?.user?.sub
  if (!sub) {
    return NextResponse.json(
      { error: "No identifier found on user" },
      { status: 400 }
    )
  }

  const key_id = params?.id

  if (typeof key_id !== "string") {
    return NextResponse.json(
      { error: "Did not find valid api key" },
      { status: 400 }
    )
  }

  try {
    const key = await deleteKey(key_id, sub)
    return NextResponse.json({ key }, res)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || "Unexpected error deleting key" },
      { status: 400 }
    )
  }
})
