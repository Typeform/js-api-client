import { axios } from '../common'
import { API_BASE_URL } from '../../src/constants'
import { clientConstructor } from '../../src/create-client'
import { Responses } from '../../src/responses'

beforeEach(() => {
  axios.reset()

  axios
    .onGet(`${API_BASE_URL}/forms/2/responses?page_size=1000`)
    .replyOnce(200, {
      total_items: 2003,
      page_count: 3,
      items: Array.from({ length: 1000 }, (_, i) => ({ response_id: i })),
    })
  axios
    .onGet(`${API_BASE_URL}/forms/2/responses?page_size=1000&before=999`)
    .replyOnce(200, {
      total_items: 2003,
      page_count: 3,
      items: Array.from({ length: 1000 }, (_, i) => ({
        response_id: 1000 + i,
      })),
    })
  axios
    .onGet(`${API_BASE_URL}/forms/2/responses?page_size=1000&before=1999`)
    .replyOnce(200, {
      total_items: 2003,
      page_count: 3,
      items: [
        { response_id: 2000 },
        { response_id: 2001 },
        { response_id: 2002 },
      ],
    })

  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123',
})

const responsesRequest = new Responses(http)

test('List responses has the correct path and method', async () => {
  await responsesRequest.list({ uid: '2' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms/2/responses`)
  expect(axios.history.get[0].method).toBe('get')
})

test('List responses with the given filters', async () => {
  await responsesRequest.list({ uid: '2', pageSize: 15, after: '12345' })
  const params = new URL(axios.history.get[0].url).searchParams
  expect(params.get('page_size')).toBe('15')
  expect(params.get('after')).toBe('12345')
})

test('List responses with automatic pagination', async () => {
  const list = await responsesRequest.list({ uid: '2', page: 'auto' })
  expect(list).toEqual({
    total_items: 2003,
    page_count: 1,
    items: Array.from({ length: 2003 }, (_, i) => ({ response_id: i })),
  })
})

test('Delete responses has the correct path and method when given string for `ids`', async () => {
  await responsesRequest.delete({ uid: '2', ids: '123' })
  expect(axios.history.delete[0].url).toBe(
    `${API_BASE_URL}/forms/2/responses?included_tokens=123`
  )
  expect(axios.history.delete[0].method).toBe('delete')
})

test('Delete responses has the correct path and method when given array of strings for `ids`', async () => {
  await responsesRequest.delete({ uid: '2', ids: ['123', '456', '789'] })
  expect(axios.history.delete[0].url).toBe(
    `${API_BASE_URL}/forms/2/responses?included_tokens=123%2C456%2C789`
  )
  expect(axios.history.delete[0].method).toBe('delete')
})
