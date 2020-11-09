## qetch
Simple GraphQL client to execute queries and mutations

## Installation 

#### via yarn
```sh
yarn add qetch
```

#### via npm
```sh
npm install qetch
```

## Example

#### without variables
```ts
import qetch, { gql } from 'qetch'
const graphQlClient = new qetch('http://localhost:8080/graphql/')

const SEARCH_QUERY = gql`
  query {
    search(q: "Apple") {
      results
    }
  }
`

graphQlClient.execute(SEARCH_QUERY).then((e) => {
  console.log(e)
})
```

#### with variables
```ts
import qetch, { gql } from 'qetch'
const graphQlClient = new qetch('http://localhost:8080/graphql/')

const SEARCH_QUERY = gql`
  query Search($searchQuery: String!) {
    search(q: $searchQuery) {
      results
    }
  }
`

graphQlClient.execute(SEARCH_QUERY, {
  searchQuery: "Apple"
}).then((e) => {
  console.log(e)
})
```

**PRO Tip :sunglasses::+1:**

You can declare custom types on variable and response object using TypeScript like this:

```ts
import qetch, { gql } from 'qetch'
const graphQlClient = new qetch('http://localhost:8080/graphql/')

const SEARCH_QUERY = gql`
  query Search($searchQuery: String!) {
    search(q: $searchQuery) {
      results
    }
  }
`

interface SearchResponse {
  search: {
    results: string[]
  }
}

interface SearchVariables {
  searchQuery: string
}

graphQlClient.execute<SearchResponse, SearchVariables>(SEARCH_QUERY, {
  searchQuery: "Apple"
}).then((e) => {
  console.log(e)
})
```

## API Reference

**`qetch`** - The module returns a constructor from which you can instantiate a client 

```ts
import qetch from 'qetch'
const graphQlClient = new qetch('http://localhost:8080/graphql/')
```

#### Params

| Parameter         | Required | Type          | Description  |
|-------------------|----------|---------------|--------------|
| `endpoint`        | `true`   |`string`        | URL to your GraphQL Endpoint |

#### Methods

- `execute(queryOrMutation, variables)` - This method should be used to execute a query or mutation.

```ts
graphQlClient.execute(SEARCH_QUERY, {
  searchQuery: "Apple"
})
```

- `setOptions(options)` - This method should be used to set [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).

```ts
// Send Auth Token in header
graphQlClient.setOptions({
  headers: {
    'Authorization': `Bearer ${JWT}`
  }
})

// This will override qetch's default fetch method (POST)
graphQlClient.setOptions({
  method: 'GET' 
})
```

---

**`gql`** - The module also exposes a `gql` function which you can use to write your GraphQL queries and mutations, here's a small example:

```js
const SEARCH_QUERY = gql`
  query Search($searchQuery: String!) {
    search(q: $searchQuery) {
      results
    }
  }
`
```

**How is this useful?** This enables your editor to highlight the tags appropriately, while the function doesn't actually do anything magical, it will make your code more readable. Try [vscode-graphql](https://github.com/prisma-labs/vscode-graphql) if you're using VSCode to enable syntax highlighting on `gql` tag function, you will have to search for such extensions if you're using some other editor! 

## Contributing

Please [open an issue](https://github.com/arjndr/qetch/issues/new) if you have any problems or bug reports. Want to add new features? Please submit a PR! If you think I'm doing something wrong, please let me know so I can improve myself :smiley::+1:

## Planned Features

1. React support via hooks
2. Support GraphQL subscriptions
3. Caching

## License

MIT &copy; 2020 Akash Rajendra
