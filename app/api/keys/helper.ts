import { ApiKey } from "app/auth/keys/types"
import dynamodb from "connection/dynamo"
import { v4 as uuidv4 } from "uuid"
import { dynamoClient } from "connection"

const MAX_API_KEYS = 10
const DEFAULT_ROLES: ApiKey["roles"] = ["basic"]

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
  })).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  return keys
}

export async function createKey(sub: string): Promise<ApiKey> {
  try {
    const params = {
      TableName: process.env.CHARITY_BASE_DYNAMO_TABLE_AUTH_KEYS!,
      IndexName: "userId-index",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": sub,
      },
      Select: "COUNT",
    }
    const data = await dynamoClient.query(params).promise()
    if (data.ScannedCount && data.ScannedCount >= MAX_API_KEYS) {
      throw new Error(`User already has ${data.ScannedCount} keys`)
    }
  } catch (err) {
    throw new Error(`Failed to query dynamodb for num keys`)
  }

  try {
    const dateString = new Date().toISOString()
    const item: ApiKey & { userId: string; updatedAt: string } = {
      id: uuidv4(),
      userId: sub,
      roles: DEFAULT_ROLES,
      createdAt: dateString,
      updatedAt: dateString,
    }
    const params = {
      TableName: process.env.CHARITY_BASE_DYNAMO_TABLE_AUTH_KEYS!,
      Item: item,
      ConditionExpression: "attribute_not_exists(id)",
    }
    await dynamoClient.put(params).promise()
    return {
      id: item.id,
      createdAt: item.createdAt,
      roles: item.roles,
    }
  } catch (e) {
    throw new Error(`Failed to create key`)
  }
}
