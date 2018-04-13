import axios from 'axios'
import {stub} from 'sinon'
import { createClient } from '../../lib/typeform'

const logHandlerStub = stub()

beforeEach(() => {
  stub(axios, 'create').returns({})
})

afterEach(() => {
  axios.create.restore()
  logHandlerStub.resetHistory()
})

test('Typeform api url is well defined when initialising', () => {

  createClient({
    token: '12345'
  })
  expect(axios.create.args[0][0].baseURL).toEqual('https://api.typeform.com')
})

test('Api token is in the headers request', () => {

  createClient({
    token: '12345'
  })
  expect(axios.create.args[0][0].headers.Authorization).toEqual('bearer 12345')
})

test('Initialising fails when missing the token', () => {
  expect(() => createClient()).toThrow('Token is missing')
})
