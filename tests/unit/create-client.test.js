import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

const client = clientConstructor({
  token: 'abc'
})

test('request pass correct headers', () => {
  client.request({
    url: '/forms',
    headers: {
      Accepts: 'application/json'
    }
  })

  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms`)
  expect(fetch.mock.calls[0][1].headers).toEqual({
    Accepts: 'application/json',
    Authorization: 'bearer abc'
  })
})

test('handle empty response', async () => {
    expect.assertions(1);
    fetch.mockResponse('', {
        status: 204
    })

    const response = await client.request({})

    expect(response).toBeUndefined();
})
