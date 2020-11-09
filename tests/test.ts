import qetch, { gql } from '../dist'

const anilistClient = new qetch('https://graphql.anilist.co')

const GET_CODE_GEASS = gql`
  query {
    Media (id: 97880, type: ANIME) {
      title {
        english
      }
    }
  }
`

const GET_CODE_GEASS_ID = gql`
  query Media ($id: Int!) {
    Media (id: $id, type: ANIME) {
      id
      title {
        english
      }
    }
  }
`

interface CodeGeassIDVariable {
  id: number
}

interface CodeGeassIDResponse {
  Media: {
    id: number
  }
}

describe('qetch', () => {
  it('should fetch', async () => {
    const results = await anilistClient.execute(GET_CODE_GEASS)
    expect(results).toBeTruthy()
  })
  
  it('should fetch again, but with variables', async () => {
    const results = await anilistClient.execute<CodeGeassIDResponse, CodeGeassIDVariable>(GET_CODE_GEASS_ID, {
      id: 97880
    })
    expect(results.Media.id).toBe(97880)
  })

  it('should reject when not provided with an endpoint', async () => {
    const failingAnilistClient = new qetch('')
    await failingAnilistClient.execute(GET_CODE_GEASS)
      .catch((e: string) => {
        console.log(e)
        expect(e).toBe('Please provide a GraphQL endpoint (e.g: https://localhost:3000/graphql/)')
      })
  })

  it('should reject when provided with an invalid endpoint', async () => {
    const failingAnilistClient = new qetch('bruhmoment')
    await failingAnilistClient.execute(GET_CODE_GEASS)
      .catch((e: string) => {
        console.log(e)
        expect(e).toBe('Invalid URL!')
      })
  })

  it('should reject when method is GET', async () => {
    anilistClient.setOptions({
      method: 'GET'
    })
    await anilistClient.execute(GET_CODE_GEASS)
      .catch((e: any) => {
        console.log(e)
        expect(typeof e.errors[0].message).toBe('string')
      })
  })
})
