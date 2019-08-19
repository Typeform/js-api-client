import { clientConstructor, buildUrlWithParams } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const client = clientConstructor({
  token: 'abc'
})

test('request pass correct headers', async () => {
  await client.request({
    url: '/forms',
    headers: {
      Accepts: 'application/json'
    }
  })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms`)
  expect(axios.history.get[0].headers).toEqual({
    Accept: 'application/json, text/plain, */*',
    Accepts: 'application/json',
    Authorization: 'bearer abc'
  })
})

test('the url reminds the same if no parameter passed', () => {
  const url = 'http://typeform.com'
  expect(buildUrlWithParams(url)).toBe(url)
})

test('the url has a query string if parameters are passed', () => {
  const url = 'http://typeform.com'
  const params = {
    a: '1',
    b: '2'
  }
  expect(buildUrlWithParams(url, params)).toBe('http://typeform.com?a=1&b=2')
})

test('parameters should be enconded', () => {
  const url = 'http://typeform.com'
  const params = {
    a: '@1',
    b: '#2'
  }
  expect(buildUrlWithParams(url, params)).toBe('http://typeform.com?a=%401&b=%232')
})

test('undefined values for parameter will be skipped', () => {
  const url = 'http://typeform.com'
  const params = {
    a: '@1',
    b: undefined
  }
  expect(buildUrlWithParams(url, params)).toBe('http://typeform.com?a=%401')
})

test('falsy values should be passed', () => {
  const url = 'http://typeform.com'
  const params = {
    a: '0',
    b: 0,
    c: null
  }
  expect(buildUrlWithParams(url, params)).toBe('http://typeform.com?a=0&b=0')
})
