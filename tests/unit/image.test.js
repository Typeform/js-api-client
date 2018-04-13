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
