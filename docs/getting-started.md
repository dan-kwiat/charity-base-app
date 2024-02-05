## Getting Started

Welcome to the CharityBase API documentation!

> **What's an API?**
>
> An API is a generic term for the tool which one piece of software uses to
> communicate with another. It's an acronym for _application programming
> interface_, but that's not important to remember. Put simply, the CharityBase
> API **_allows anyone to plug into our database_**. A user of the API can
> request specific information about charities in the UK and the API will
> respond almost immediately with the relevant structured data. This enables
> organisations to build charitable digital tools without needing to do the
> heavy lifting of collecting, storing, cleaning, aggregating and serving data.

### Endpoint

To use the API you send an HTTP request to an endpoint and get back a JSON
response. CharityBase is a GraphQL API - this differs from the REST paradigm but
you can still use your usual tools. The main difference is that there's only one
endpoint. Every request you send will be to this URL:

```http
https://charitybase.uk/api/graphql
```

### Authorisation

Every request must be sent with an `Authorization` header of the form:

```
Apikey YOUR_API_KEY
```

where `YOUR_API_KEY` is one of [your keys](https://charitybase.uk/console/keys).

### Query

We request different types of data by specifying a `query` parameter, which is a
string. This string is written in GraphQL syntax and specifies everything about
the data we want to receive. Don't be put off if the query language is
unfamiliar - it's a bit like JSON and doesn't take long to learn. For example,
here's a query string to count all charities registered with the Charity
Commission for England & Wales (CHC):

```graphql
{
  CHC {
    getCharities(filters: {}) {
      count
    }
  }
}
```

> Whitespace in the query doesn't affect the response - the newlines and
> indentation are just for readability.

> All GraphQL query examples in these docs have a pink play button to open them
> in the [interactive playground](/api/graphql).

### Response

We get back a JSON response which can contain a `data` object and an `errors`
array:

```json
{
  "data": {...},
  "errors": [...]
}
```

The `data` object is the same shape as the `query` we sent, but with the value
now filled in:

```json
{
  "CHC": {
    "getCharities": {
      "count": 168438
    }
  }
}
```

If there are problems with the query, the `data` object may or may not be
defined - it depends on the type of error. However the `errors` array is only
defined if something went wrong, so check if it exists before trying to read
`data`. For example, if we'd misspelt "count" in our query, we'd get this for
`errors`:

```json
[
  {
    "message": "Cannot query field \"countt\" on type \"FilteredCharitiesCHC\". Did you mean \"count\"?",
    "locations": [
      {
        "line": 4,
        "column": 7
      }
    ],
    "extensions": {
      "code": "GRAPHQL_VALIDATION_FAILED"
    }
  }
]
```

### GET vs POST

Data can be fetched by sending a `GET` request to the API endpoint, just like
you'd do with a REST API. Simply include your query as a URL search parameter:

```http
https://charitybase.uk/api/graphql?query={CHC{getCharities(filters:{}){count}}}
```

Unlike the REST paradigm however, with GraphQL it's also possible, and
encouraged, to fetch data using `POST`. This way we don't have to worry about
the URL getting too long because we can send the query string in a JSON body.
The examples in this documentation use `POST`. We suggest you do the same, but
it's not compulsory.

### Basic Example .js .py

These code snippets use the query from above to count all charities registered
in England & Wales. Remember to replace `YOUR_API_KEY` with your actual key.

#### cURL

```bash
curl \
  -X POST \
  -H "Authorization: Apikey YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "query": "{ CHC { getCharities(filters: {}) { count } } }" }' \
  https://charitybase.uk/api/graphql
```

#### JavaScript

```javascript
// Optional dependency to run in Node or older browsers: yarn add isomorphic-unfetch
// import fetch from 'isomorphic-unfetch'

const URL = "https://charitybase.uk/api/graphql"
const HEADERS = {
  Authorization: "Apikey YOUR_API_KEY",
  "Content-Type": "application/json",
}
const COUNT_QUERY = `
  {
    CHC {
      getCharities(filters: {}) {
        count
      }
    }
  }
`

function countCharities() {
  return fetch(URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query: COUNT_QUERY }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("FETCH ERROR (probably your network)")
      throw err
    })
    .then(({ data, errors }) => {
      if (errors) {
        console.error("QUERY ERRORS")
        throw errors
      }
      console.log(data)
      return data.CHC.getCharities.count
    })
}
```

#### React (JSX)

```jsx
// yarn add apollo-boost @apollo/react-hooks graphql
import ApolloClient, { gql } from "apollo-boost"
import { ApolloProvider, useQuery } from "@apollo/react-hooks"

const client = new ApolloClient({
  uri: "https://charitybase.uk/api/graphql",
  headers: {
    Authorization: "Apikey YOUR_API_KEY",
  },
})

const COUNT_QUERY = gql`
  {
    CHC {
      getCharities(filters: {}) {
        count
      }
    }
  }
`

const CharitiesCount = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return <p>There are {data.CHC.getCharities.count} charities!</p>
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>CharityBase Demo 🚀</h1>
      <CharitiesCount />
    </ApolloProvider>
  )
}
```

#### Python

```python
# pip install requests
import requests

URL = "https://charitybase.uk/api/graphql"
HEADERS = {
    "Authorization": "Apikey YOUR_API_KEY",
    "Content-Type": "application/json",
}
COUNT_QUERY = """
{
  CHC {
    getCharities(filters: {}) {
      count
    }
  }
}
"""

def count_charities():
    try:
        res = requests.post(
            URL,
            headers=HEADERS,
            json={ "query": COUNT_QUERY }
        )
        payload = res.json()
    except Exception as e:
        print("REQUEST ERROR (probably your network)")
        raise Exception(e)
    if "errors" in payload:
        print("QUERY ERRORS")
        raise Exception(payload["errors"])
    print(payload["data"])
    return payload["data"]["CHC"]["getCharities"]["count"]
```

### Arguments

Some fields in the GraphQL query accept arguments. You might have noticed that
the `getCharities` field in the basic example above accepts a `filters`
argument, which in this case is also a _required_ argument. The `filters`
argument lets us define the kinds of charities we want to be included in the
response. For example, to count all charities with at least £100k income, we'd
pass the following filters:

```graphql
{
  CHC {
    getCharities(filters: { finances: { latestIncome: { gte: 100000 } } }) {
      count
    }
  }
}
```

### Query Name

Up until now we've been using a shorthand syntax where we omit both the query
keyword and the query name. In production apps it's useful to explicitly tell
CharityBase we're sending a query, and to give that query a name. For example,
let's name our query `CountCharitiesCHC`:

```graphql
query CountCharitiesCHC {
  CHC {
    getCharities(filters: { finances: { latestIncome: { gte: 100000 } } }) {
      count
    }
  }
}
```

> This longhand syntax is required if you're using [variables](#variables).

### Variables

Suppose we wanted to query with different argument values depending on some
context e.g. user input. One option would be to dynamically create our query
string before sending it. However GraphQL provides a neater way to deal with
variables which allows us to keep our query strings static. Here's how it works:

- Declare `$variableName` and its type as one of the variables accepted by the
  query
- Replace the static value in the query with `$variableName`
- Send the variable value in a `variables` JSON parameter alongside the `query`
  parameter

For example, let's replace the minimum income `100000` from the query above with
a variable called `minIncome`:

```graphql
query CountCharitiesCHC($minIncome: Float) {
  CHC {
    getCharities(filters: { finances: { latestIncome: { gte: $minIncome } } }) {
      count
    }
  }
}
```

Now we can send its value in a `variables` object alongside the `query` in the
request body:

```json
{
  "query": "...",
  "variables": { "minIncome": 100000 }
}
```

> The declared variable type e.g. `Float` must match the type of the relevant
> field e.g. `gte`, as defined in the schema.

> As with `query`, you may send `variables` as a URL search parameter instead of
> in the body.

### Playground

The [playground](/api/graphql) is an interactive environment to experiment with
different queries. The left hand panel makes up the query string of your request
and the right hand panel shows the API's response. Some tips:

- When typing your query, use `ctrl+space` to see suggested fields and
  `ctrl+enter` to send a request.
- The `DOCS` tab on the right hand side of the screen shows all the fields and
  arguments available, including their data types.
- If your query includes [variables](#variables), use the `QUERY VARIABLES`
  panel in the bottom left to type them out as JSON e.g.
  `{ "minIncome": 100000 }`

<!-- ### Schema -->

<!-- ### Versioning -->

<!-- There is no versioning. -->

## Query Examples

Below are some examples to give you an idea of what's possible. Press the pink
play button to open them up in the playground, then customise them for your own
purposes.

### Count, Aggregate, List

The `getCharities` field expects one or more of the following sub-fields:

- `count`: to count all the matching charities
- `aggregate`: to break down the total count by a particular parameter's value
  or range
- `list`: to show detailed information about a number of individual charities

For example, let's search charities with at least £100k income for the word
"green". In a single request we'll ask for:

- the total count of charities
- the count for each region in England & Wales
- the id, names & activities of 10 of those charities

```graphql
query CountAggregateList {
  CHC {
    getCharities(
      filters: { search: "green", finances: { latestIncome: { gte: 100000 } } }
    ) {
      count
      aggregate {
        geo {
          region {
            buckets {
              key
              name
              count
            }
          }
        }
      }
      list(limit: 10) {
        id
        names {
          value
        }
        activities
      }
    }
  }
}
```

> The `filters` argument applies to each of the `count`, `aggregate` and `list`
> fields.

### List Pagination

The `list` field accepts optional `limit` and `skip` arguments for us to page
through results. For example, to request the 2nd page of charities with 30
charities per page:

```graphql
query ListLimitSkip {
  CHC {
    getCharities(filters: {}) {
      list(limit: 30, skip: 30) {
        id
      }
    }
  }
}
```

> By default `limit` is `10` and `skip` is `0`.

> Don't use pagination to download data in bulk. If the CSV download in the
> [Search Portal](https://search.charitybase.uk/chc?download=t) doesn't serve
> your needs, please email support@charitybase.uk

### More Examples

Coming soon...

<!-- ## CharityBase Elements -->
<!--
CharityBase Elements is a set of prebuilt UI components, like inputs and maps,
which utilise the API for common use cases. Elements are completely customisable
and you can style Elements to match the look and feel of your site. They're
coming soon... -->

<!-- ## React Components -->

<!-- ## Schema -->
