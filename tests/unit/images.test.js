import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import images from '../../src/images'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

const http = clientConstructor({
  token: '123'
})
const imagesRequest = images(http)

test('get images collection', () => {
  imagesRequest.list()
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images`)
})

test('get images by ID', () => {
  imagesRequest.get({ id: 'abc123' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123`)
  expect(fetch.mock.calls[0][1].method).toBe('get')
})

test('adding an image using `image` passes the required values', () => {
  imagesRequest.add({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    fileName: 'newimage.gif'
  })

  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images`)
  expect(fetch.mock.calls[0][1].method).toBe('post')

  const imageData = JSON.parse(fetch.mock.calls[0][1].body)
  expect(imageData).toEqual({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    file_name: 'newimage.gif'
  })
})

test('adding an image using `url` passes the required values', () => {
  imagesRequest.add({
    url: 'https://www.typeform.com/logo.png',
    fileName: 'logo.png'
  })

  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images`)
  expect(fetch.mock.calls[0][1].method).toBe('post')

  const imageData = JSON.parse(fetch.mock.calls[0][1].body)
  expect(imageData).toEqual({
    url: 'https://www.typeform.com/logo.png',
    file_name: 'logo.png'
  })
})

test('deleting an image sets the correct method and id', () => {
  imagesRequest.delete({ id: 'abc123' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123`)
  expect(fetch.mock.calls[0][1].method).toBe('delete')
})

test('it set the correct header when retrieving the image json description', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json' })
  expect(fetch.mock.calls[0][1].headers.Accept).toBe('application/json')
})

test('when getting an image by size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json', size: 'mobile' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/image/mobile`)
})

test('when getting an image by size what does not exist throws', () => {
  expect(() => imagesRequest.get({ id: 'abc123', size: 'big' })).toThrow(
    `Image size doesn't exist`
  )
})

test('when getting an image by background size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json', backgroundSize: 'tablet' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/background/tablet`)
})

test('when getting an image by choice size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', choiceSize: 'supersize' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/choice/supersize`)
})
