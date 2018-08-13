import { API_BASE_URL } from '../../src/constants'
import { clientConstructor } from '../../src/create-client'
import responses from '../../src/responses'

beforeEach(() => {
  fetch.resetMocks()
})

test('List responses has the correct path and method', () => {
  const http = clientConstructor({
    token: '123'
  })
  const responsesRequest = responses(http)
  responsesRequest.list({ uid: 2 })
  expect(fetch.mock.calls[0][1].method).toBe('get')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/responses`)
})
