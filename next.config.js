module.exports = {
  async redirects() {
    return [
      {
        source: `/api-portal`,
        destination: "/docs",
        permanent: false,
      },
      {
        source: `/api-portal/playground`,
        destination: "/api/graphql",
        permanent: false,
      },
      {
        source: `/about/:slug`,
        destination: "/about",
        permanent: false,
      },
    ]
  },
  async headers() {
    // https://vercel.com/docs/environment-variables#system-environment-variables
    // Make sure preview sites are not indexed by search engines:
    if (process.env.VERCEL_ENV === "production") {
      return []
    } else {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "x-robots-tag",
              value: "noindex",
            },
          ],
        },
      ]
    }
  },
}
