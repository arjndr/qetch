import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

polyfill()

interface RequestOptions {
  method: string
  headers: any
  body: string
}

/**
 * @param {string} url - Your GraphQL Endpoint
 */
class graphQlClient {
  private url: string
  private options: any = {}

  constructor (url: string) {
    this.url = url
  }

  /**
   * @param {object} options
   */
  public setOptions(options: any) {
    this.options = options
  }

  /**
   * @param {string} queryOrMutation - A valid GraphQL query or mutation (subscriptions not supported!)
   * @param {object} variables - GraphQL variables
   */
  public execute(queryOrMutation: string, variables?: any) {
    const { url } = this
    return new Promise<any>((resolve, reject) => {
      if (url && url.length > 0) {
        if (validateUrl(url)) {
          if (queryOrMutation) {
            let graphql = JSON.stringify({
              query: queryOrMutation
            })
  
            if (variables) {
              graphql = JSON.stringify({
                query: queryOrMutation,
                variables: variables
              })
            }
  
            let requestOptions: RequestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: graphql,
              ...this.options
            }
  
            fetch(url, requestOptions)
              .then(response => {
                return response.json()
              })
              .then(result => {
                if (result.errors) {
                  reject(result)
                } else {
                  resolve(result.data)
                }
              })
              .catch(error => reject(error))
          } else {
            reject('Please provide a Query or Mutation!')
          }
        } else {
          reject('Invalid URL!')
        }
      } else {
        reject('Please provide a GraphQL endpoint (e.g: https://localhost:3000/graphql/)')
      }
    })
  }
}

const validateUrl = (Url: string) => {
  const validationRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
  return validationRegEx.test(Url)
}

const gql = (literals: TemplateStringsArray, ...placeholders: any) => {
  return literals.reduce((prev, curr, index) => prev + curr + placeholders[index])
}

export {
  gql
}

export default graphQlClient
