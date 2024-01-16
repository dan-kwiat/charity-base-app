import { initAuth0 } from "@auth0/nextjs-auth0"

const auth0 = initAuth0({
  secret: process.env.CHARITY_BASE_AUTH0_RANDOM_SECRET,
  issuerBaseURL: process.env.CHARITY_BASE_AUTH0_JWT_ISSUER,
  baseURL: process.env.NEXT_PUBLIC_URL,
  clientID: process.env.CHARITY_BASE_AUTH0_CLIENT_ID,
  clientSecret: process.env.CHARITY_BASE_AUTH0_CLIENT_SECRET,
})

export const GET = auth0.handleAuth()
