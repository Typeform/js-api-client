import { clientConstructor } from '../../src/create-client'
import { createClient } from '../../src/typeform'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

test('client costructor has a request function property', () => {
  const client = clientConstructor({
    token: '12345'
  })
  expect(client.request).toBeDefined()
})

test('Initialising fails when missing the token', () => {
  expect(() => createClient()).toThrow('Token is missing')
})
