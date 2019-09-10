import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { createClient } from '../../src'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

test('client constructor has a request function property', () => {
  const client = clientConstructor({
    token: '12345'
  })
  expect(client.request).toBeDefined()
})

test('Initialising fails when missing the token', () => {
  expect(() => createClient()).toThrow('Token is missing')
})
