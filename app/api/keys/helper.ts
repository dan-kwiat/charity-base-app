import { ApiKey } from "app/auth/keys/types"
import dynamodb from "connection/dynamo"

export async function getKeys(sub: string): Promise<Array<ApiKey>> {
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
    throw new Error("No items found on response from dynamodb")
  }

  const keys: Array<ApiKey> = data.Items.map(({ id, createdAt, roles }) => ({
    id,
    createdAt,
    roles,
  }))

  return keys
}
