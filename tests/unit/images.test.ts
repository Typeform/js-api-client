import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Images } from '../../src/images'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const imagesRequest = new Images(http)

test('get images collection', async () => {
  await imagesRequest.list()
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/images`)
})

test('get images by ID', async () => {
  await imagesRequest.get({ id: 'abc123' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/images/abc123`)
  expect(axios.history.get[0].method).toBe('get')
})

test('adding an image using `image` passes the required values', async () => {
  await imagesRequest.add({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    fileName: 'newimage.gif'
  })
  expect(axios.history.post[0].url).toBe(`${API_BASE_URL}/images`)
  expect(axios.history.post[0].method).toBe('post')
  const imageData = JSON.parse(axios.history.post[0].data)
  expect(imageData).toEqual({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    file_name: 'newimage.gif'
  })
})

test('adding an image using `url` passes the required values', async () => {
  await imagesRequest.add({
    url: 'https://www.typeform.com/logo.png',
    fileName: 'logo.png'
  })
  expect(axios.history.post[0].url).toBe(`${API_BASE_URL}/images`)
  expect(axios.history.post[0].method).toBe('post')
  const imageData = JSON.parse(axios.history.post[0].data)
  expect(imageData).toEqual({
    url: 'https://www.typeform.com/logo.png',
    file_name: 'logo.png'
  })
})

test('deleting an image sets the correct method and id', async () => {
  await imagesRequest.delete({ id: 'abc123' })
  expect(axios.history.delete[0].url).toBe(`${API_BASE_URL}/images/abc123`)
  expect(axios.history.delete[0].method).toBe('delete')
})

test('it set the correct header when retrieving the image json description', async () => {
  await imagesRequest.get({ id: 'abc123' })
  expect(axios.history.get[0].headers.Accept).toBe('application/json')
})

test('when getting an image by size it retrieves from the correct endpoint', async () => {
  await imagesRequest.get({ id: 'abc123', size: 'mobile' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/images/abc123/image/mobile`)
})

test('when getting an image by background size it retrieves from the correct endpoint', async () => {
  await imagesRequest.get({ id: 'abc123', backgroundSize: 'tablet' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/images/abc123/background/tablet`)
})

test('when getting an image by choice size it retrieves from the correct endpoint', async () => {
  await imagesRequest.get({ id: 'abc123', choiceSize: 'supersize' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/images/abc123/choice/supersize`)
})

test('when getting an image by size what does not exist throws', () => {
  expect(() => imagesRequest.get({ id: 'abc123', size: 'big' })).toThrow(
    `Image size doesn't exist`
  )
})
