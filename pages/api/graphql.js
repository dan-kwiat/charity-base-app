import Cors from "cors"
import { ApolloServer } from "apollo-server-micro"
import schema from "graphql-schema"
import runMiddleware from "helpers/runMiddleware"
import { authHeaders } from "graphql-schema/directiveResolvers/helpers"
import { logRequest } from "helpers/logRequestNew"
const cors = Cors({})

const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.cursorShape": "line", // possible values: 'line', 'block', 'underline'
      "editor.fontFamily": `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
      "editor.fontSize": 14,
      "editor.reuseHeaders": true, // new tab reuses headers from last tab
      "editor.theme": "dark", // possible values: 'dark', 'light'
      "general.betaUpdates": false,
      "prettier.printWidth": 80,
      "prettier.tabWidth": 2,
      "prettier.useTabs": false,
      "request.credentials": "omit", // possible values: 'omit', 'include', 'same-origin'
      "schema.polling.enable": true, // enables automatic schema polling
      "schema.polling.endpointFilter": "*localhost*", // endpoint filter for schema polling
      "schema.polling.interval": 2000, // schema polling interval in ms
      // "schema.disableComments": boolean,
      "tracing.hideTracingResponse": true,
      "tracing.tracingSupported": false, // set false to remove x-apollo-tracing header from Schema fetch requests
      "queryPlan.hideQueryPlanResponse": true,
    },
    // tabs: [
    //   {
    //     endpoint: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
    //     query: `{
    //   CHC {
    //     getCharities(filters: {}) {
    //       count
    //     }
    //   }
    // }`,
    //     name: "Count Charities Example",
    //     responses: [""],
    //   },
    // ],
  },
  introspection: true,
  context: async ({ req }) => {
    const { authorization, origin } = req.headers
    const apiKey = authHeaders(authorization || "").apikey
    await logRequest(origin, apiKey)

    // if the request comes from charitybase website, set auth header if none exists.
    // warning: origin could easily be spoofed
    if (!authorization && origin === process.env.NEXT_PUBLIC_URL) {
      return {
        req: {
          ...req,
          headers: {
            ...req.headers,
            authorization: `Apikey ${process.env.NEXT_PUBLIC_CB_SANDBOX_API_KEY}`,
          },
        },
      }
    }
    return { req }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handler(req, res) {
  await runMiddleware(req, res, cors)
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res)
}

export default handler
