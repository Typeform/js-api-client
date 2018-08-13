import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import themes from '../../src/themes'

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
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

const http = clientConstructor({
  token: '123'
})
const themesRequest = themes(http)

test('Get themes has the correct path', () => {
  themesRequest.list()
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/themes`)
})

test('Get themes has the correct parameters', () => {
  themesRequest.list({ page: 3, page_size: 15 })
  expect(fetch.mock.calls[0][1].params.page).toBe(3)
  expect(fetch.mock.calls[0][1].params.page_size).toBe(15)
})

test('Get themes has the correct path', () => {
  themesRequest.get({ id: 2 })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/themes/2`)
})

test('Creating a theme has the correct method', () => {
  themesRequest.create(mockThemePayload)
  expect(fetch.mock.calls[0][1].method).toBe('post')
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

test('Delete a theme has the correct path and method', () => {
  themesRequest.delete({ id: 2 })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/themes/2`)
  expect(fetch.mock.calls[0][1].method).toBe('delete')
})

test('Updating a theme has the correct path and method', () => {
  themesRequest.update({ id: 2, ...mockThemePayload })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/themes/2`)
  expect(fetch.mock.calls[0][1].method).toBe('put')
})

