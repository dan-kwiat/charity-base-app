import Cors from "cors"
import { ApolloServer } from "apollo-server-micro"
import schema from "graphql-schema-auth"
import { runMiddleware } from "helpers"
const cors = Cors()

const apolloServer = new ApolloServer({
  schema,
  playground: false,
  introspection: true,
  context: ({ req }) => ({ req }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handler(req, res) {
  await runMiddleware(req, res, cors)
  return apolloServer.createHandler({ path: "/api/auth/graphql" })(req, res)
}
export default handler
