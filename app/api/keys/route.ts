import auth0 from "lib/auth0"
import { NextResponse } from "next/server"
import { createKey, getKeys } from "./helper"

export const GET = auth0.withApiAuthRequired(async function GET(req) {
  const res = new NextResponse()
  const session = await auth0.getSession(req, res)
  const sub = session?.user?.sub
  if (!sub) {
    return NextResponse.json(
      { error: "No identifier found on user" },
      { status: 400 }
    )
  }
  try {
    const keys = await getKeys(sub)
    return NextResponse.json({ keys }, res)
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Unexpected error getting keys" },
      { status: 400 }
    )
  }
})

export const POST = auth0.withApiAuthRequired(async function POST(req) {
  const res = new NextResponse()
  const session = await auth0.getSession(req, res)
  const sub = session?.user?.sub
  if (!sub) {
    return NextResponse.json(
      { error: "No identifier found on user" },
      { status: 400 }
    )
  }
  try {
    const key = await createKey(sub)
    console.log(key)
    return NextResponse.json({ key }, res)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: err.message || "Unexpected error creating key" },
      { status: 400 }
    )
  }
})
