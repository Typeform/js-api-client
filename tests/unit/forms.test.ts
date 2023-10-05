import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Forms } from '../../src/forms'

beforeEach(() => {
  axios.reset()

  axios.onGet(`${API_BASE_URL}/forms?page=1&page_size=200`).replyOnce(200, {
    total_items: 403,
    page_count: 3,
    items: Array.from({ length: 200 }, (_, i) => i),
  })
  axios.onGet(`${API_BASE_URL}/forms?page=2&page_size=200`).replyOnce(200, {
    total_items: 403,
    page_count: 3,
    items: Array.from({ length: 200 }, (_, i) => 200 + i),
  })
  axios.onGet(`${API_BASE_URL}/forms?page=3&page_size=200`).replyOnce(200, {
    total_items: 402,
    page_count: 3,
    items: [400, 401, 402],
  })

  axios.onAny().replyOnce(200, {})
})

const http = clientConstructor({
  token: '123',
})
const formsRequest = new Forms(http)

test('get all forms has the correct method and path', async () => {
  await formsRequest.list()
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms`)
  expect(axios.history.get[0].method).toBe('get')
})

test('parameters are sent correctly', async () => {
  await formsRequest.list({
    page: 2,
    pageSize: 10,
    search: 'hola',
    workspaceId: 'abc',
  })
  const url = axios.history.get[0].url.split('?')
  const params = new URLSearchParams(url[1])
  expect(params.get('page')).toBe('2')
  expect(params.get('page_size')).toBe('10')
  expect(params.get('search')).toBe('hola')
  expect(params.get('workspace_id')).toBe('abc')
})

test('get all forms with automatic pagination', async () => {
  const list = await formsRequest.list({ page: 'auto' })
  expect(list).toEqual({
    total_items: 403,
    page_count: 1,
    items: Array.from({ length: 403 }, (_, i) => i),
  })
})

test('getForm sends the correct UID', async () => {
  await formsRequest.get({ uid: 'abc123' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms/abc123`)
})

test('getForm sets get method', async () => {
  await formsRequest.get({ uid: 'abc123' })
  expect(axios.history.get[0].method).toBe('get')
})

test('updateForm sends the correct UID and data', async () => {
  await formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola',
    },
  })
  const bodyParsed = JSON.parse(axios.history.patch[0].data)
  expect(axios.history.patch[0].url).toBe(`${API_BASE_URL}/forms/abc123`)
  expect(bodyParsed.title).toBe('hola')
})

test('updateForm sets patch method in request by default', async () => {
  await formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola',
    },
  })
  expect(axios.history.patch[0].method).toBe('patch')
})

test('updateForm sets put method in request when override option is set', async () => {
  await formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola',
    },
    override: true,
  })
  expect(axios.history.put[0].method).toBe('put')
})

test('deleteForm removes the correct uid form ', async () => {
  await formsRequest.delete({
    uid: 'abc123',
  })
  expect(axios.history.delete[0].method).toBe('delete')
  expect(axios.history.delete[0].url).toBe(`${API_BASE_URL}/forms/abc123`)
})

test('create form has the correct path and method ', async () => {
  // @ts-ignore
  await formsRequest.create({})
  expect(axios.history.post[0].method).toBe('post')
  expect(axios.history.post[0].url).toBe(`${API_BASE_URL}/forms`)
})

test('get messages has the correct path and method ', async () => {
  await formsRequest.messages.get({ uid: 'abc123' })

  expect(axios.history.get[0].method).toBe('get')
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms/abc123/messages`)
})

test('update messages has the correct path and method ', async () => {
  await formsRequest.messages.update({
    uid: 'abc123',
    data: {},
  })

  expect(axios.history.put[0].method).toBe('put')
  expect(axios.history.put[0].url).toBe(`${API_BASE_URL}/forms/abc123/messages`)
})
