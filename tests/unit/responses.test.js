import { API_BASE_URL } from '../../src/constants'
import { clientConstructor } from '../../src/create-client'
import responses from '../../src/responses'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

const http = clientConstructor({
  token: '123'
})

const responsesRequest = responses(http)

test('List responses has the correct path and method', () => {
  responsesRequest.list({ uid: 2 })
  expect(fetch.mock.calls[0][1].method).toBe('get')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/responses`)
})

test('List responses with the given filters', () => {
  responsesRequest.list({ uid: 2, pageSize: 15, after: '12345' })
  const params = (new URL(fetch.mock.calls[0][0])).searchParams
  expect(params.get('page_size')).toBe('15')
  expect(params.get('after')).toBe('12345')
})

test('Delete responses has the correct path and method when given string for `ids`', () => {
  responsesRequest.delete({ uid: 2, ids: '123' })
  expect(fetch.mock.calls[0][1].method).toBe('delete')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/responses?included_tokens=123`)
})

test('Delete responses has the correct path and method when given array of strings for `ids`', () => {
  responsesRequest.delete({ uid: 2, ids: ['123', '456', '789'] })
  expect(fetch.mock.calls[0][1].method).toBe('delete')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/responses?included_tokens=123%2C456%2C789`)
})
