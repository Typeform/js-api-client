import axios from 'axios'

import { stub, spy } from 'sinon'
import { getResponses } from '../../src/responses'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test.only('List repsonses has the correct path and method', () => {
  getResponses(axios, { uid: 2 })
  expect(axios.request.args[0][0].method).toBe('get')
  expect(axios.request.args[0][0].url).toBe('/forms/2/responses')
})
