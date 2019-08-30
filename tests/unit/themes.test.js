import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Themes } from '../../src/themes'

const mockThemePayload = {
  name: 'New theme',
  colors: {
    answer: '#4FB0AE',
    background: '#FFFFF',
    button: '#4FB0AE',
    question: '#DDDDDD'
  },
  font: 'Arial'
}

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const themesRequest = new Themes(http)

test('Get themes has the correct path', async () => {
  await themesRequest.list()
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/themes`)
})

test('Get themes has the correct parameters', async () => {
  await themesRequest.list({ page: 3, pageSize: 15 })
  const params = new URL(axios.history.get[0].url).searchParams
  expect(params.get('page')).toBe('3')
  expect(params.get('page_size')).toBe('15')
})

test('Get themes has the correct path', async () => {
  await themesRequest.get({ id: 2 })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/themes/2`)
})

test('Creating a theme has the correct method', async () => {
  await themesRequest.create(mockThemePayload)
  expect(axios.history.post[0].method).toBe('post')
})

test('Throws if required values are not sent', () => {
  const { name, ...incompletePayload } = mockThemePayload
  expect(() => themesRequest.create(incompletePayload)).toThrow()
})

test('Throws if a font name is not supported', () => {
  expect(() =>
    themesRequest.create({
      ...mockThemePayload,
      font: 'asdf'
    })
  ).toThrow()
})

test('Delete a theme has the correct path and method', async () => {
  await themesRequest.delete({ id: 2 })
  expect(axios.history.delete[0].url).toBe(`${API_BASE_URL}/themes/2`)
  expect(axios.history.delete[0].method).toBe('delete')
})

test('Updating a theme has the correct path and method', async () => {
  await themesRequest.update({ id: 2, ...mockThemePayload })
  expect(axios.history.put[0].url).toBe(`${API_BASE_URL}/themes/2`)
  expect(axios.history.put[0].method).toBe('put')
})
