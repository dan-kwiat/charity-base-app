import { ApiKey } from "app/auth/keys/types"
import dynamodb from "connection/dynamo"
import auth0 from "lib/auth0"
import { NextResponse } from "next/server"

export const GET = auth0.withApiAuthRequired(async function GET(req) {
  const res = new NextResponse()
  const session = await auth0.getSession(req, res)
  const sub = session?.user?.sub
  const data = await dynamodb
    .query({
      TableName: process.env.CHARITY_BASE_DYNAMO_TABLE_AUTH_KEYS!,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": sub,
      },
      Select: "ALL_ATTRIBUTES",
    })
    .promise()

  if (!data.Items) {
    return NextResponse.json({ keys: [] }, res) // todo: make it a 400 response with message
  }

  const keys: Array<ApiKey> = data.Items.map(({ id, createdAt, roles }) => ({
    id,
    createdAt,
    roles,
  }))

  return NextResponse.json({ keys }, res)
})
