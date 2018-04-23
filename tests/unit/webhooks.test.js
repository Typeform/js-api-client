import axios from 'axios'

import { stub, spy } from 'sinon'
import {
  getWebhook,
  createOrUpdateWebhook,
  deleteWebhook
} from '../../src/webhooks'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test('List webhooks has the correct path and method', () => {
  getWebhook(axios, { uid: 2, tag: 'test' })
  expect(axios.request.args[0][0].method).toBe('get')
  expect(axios.request.args[0][0].url).toBe('/forms/2/webhooks/test')
})

test('Create a new webhooks has the correct path and method', () => {
  createOrUpdateWebhook(axios, {
    uid: 2,
    tag: 'test',
    url: 'http://test.com',
    enable: true
  })
  expect(axios.request.args[0][0].method).toBe('put')
  expect(axios.request.args[0][0].url).toBe('/forms/2/webhooks/test')
})

test('Create a new webhooks requires a url', () => {
  expect(() => createOrUpdateWebhook(axios, { uid: 2, tag: 'test' })).toThrow()
})

test('Create a new webhooks sends the correct payload', () => {
  createOrUpdateWebhook(axios, {
    uid: 2,
    tag: 'test',
    url: 'http://example.com'
  })
  expect(axios.request.args[0][0].data.url).toBe('http://example.com')
})

test('Delete a webhook has the correct path and method', () => {
  deleteWebhook(axios, { uid: 2, tag: 'test' })
  expect(axios.request.args[0][0].method).toBe('delete')
  expect(axios.request.args[0][0].url).toBe('/forms/2/webhooks/test')
})
