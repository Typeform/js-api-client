import axios from 'axios'
import { stub, spy } from 'sinon'
import {
  getImages,
  getImage,
  addImage,
  removeImage
} from '../../lib/image'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test('get images collection', () => {
  getImages(axios)
  expect(axios.request.args[0][0].url).toBe('/images')
})

test('get images by ID', () => {
  getImage(axios, { id: 'abc123' })
  expect(axios.request.args[0][0].url).toBe('/images/abc123')
  expect(axios.request.args[0][0].method).toBe('get')
})

test('adding an image pass the required values', () => {
  addImage(axios, {
    "image": "bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==",
    "media_type": "image/gif",
    "file_name": "newimage.gif"
  })

  const imageData = axios.request.args[0][0].data
  expect(axios.request.args[0][0].url).toBe('/images')
  expect(axios.request.args[0][0].method).toBe('post')
  expect(imageData).toEqual({
    "image": "bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==",
    "media_type": "image/gif",
    "file_name": "newimage.gif"
  })
})

test('removing an image sets the correct method and id', () => {
  removeImage(axios, { id: 'abc123' })
  expect(axios.request.args[0][0].url).toBe('/images/abc123')
  expect(axios.request.args[0][0].method).toBe('delete')
})

test('it set the correct header when retrieving the image json description', () => {
  getImage(axios, { id: 'abc123', returns: 'json' })
  expect(axios.request.args[0][0].headers.Accept).toBe('application/json')
})

test('when getting an image by size it retrieves from the correct endpoint', () => {
  getImage(axios, { id: 'abc123', returns: 'json', size: 'mobile'})
  expect(axios.request.args[0][0].url).toBe('/images/abc123/image/mobile')
})

test('when getting an image by size what does not exists throws', () => {
  expect(() => getImage(axios, { id: 'abc123', size: 'big' })).toThrow(`Image size doesn't exists`)
})

test('when getting an image by background size it retrieves from the correct endpoint', () => {
  getImage(axios, { id: 'abc123', returns: 'json', backgroundSize: 'tablet' })
  expect(axios.request.args[0][0].url).toBe('/images/abc123/background/tablet')
})

test('when getting an image by choice size it retrieves from the correct endpoint', () => {
  getImage(axios, { id: 'abc123', choiceSize: 'supersize' })
  expect(axios.request.args[0][0].url).toBe('/images/abc123/choice/supersize')
})
