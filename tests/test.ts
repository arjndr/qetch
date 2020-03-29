import qetch, { gql } from '../dist'

const pokemonClient = new qetch('https://graphql-pokemon.now.sh/')

const GET_POKEMON_SPECIAL_ATTACKS = gql`
  query {
    pokemon(name: "Pikachu") {
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
    }
  }
`

const GET_PIKACHU_ID = gql`
  query Pokemon($pokemonName: String!) {
    pokemon (name: $pokemonName) {
      id
    }
  }
`

describe('qetch', () => {
  it('should fetch', async () => {
    const results = await pokemonClient.execute(GET_POKEMON_SPECIAL_ATTACKS)
    expect(results).toBeTruthy()
  })
  
  it('should fetch again, but with variables', async () => {
    const results = await pokemonClient.execute(GET_PIKACHU_ID, {
      pokemonName: "Pikachu"
    })
    expect(results.pokemon.id).toBe('UG9rZW1vbjowMjU=')
  })

  it('should reject when not provided with an endpoint', async () => {
    const failingPokemonClient = new qetch('')
    await failingPokemonClient.execute(GET_PIKACHU_ID)
      .catch((e: string) => {
        console.log(e)
        expect(e).toBe('Please provide a GraphQL endpoint (e.g: https://localhost:3000/graphql/)')
      })
  })

  it('should reject when provided with an invalid endpoint', async () => {
    const failingPokemonClient = new qetch('bruhmoment')
    await failingPokemonClient.execute(GET_PIKACHU_ID)
      .catch((e: string) => {
        console.log(e)
        expect(e).toBe('Invalid URL!')
      })
  })

  it('should reject when method is GET', async () => {
    pokemonClient.setOptions({
      method: 'GET'
    })
    await pokemonClient.execute(GET_POKEMON_SPECIAL_ATTACKS)
      .catch((e: any) => {
        console.log(e)
        expect(typeof e.errors[0].message).toBe('string')
      })
  })
})
