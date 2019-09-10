import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Workspaces } from '../../src/workspaces'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const workspacesRequest = new Workspaces(http)

test(`Get workspaces has the correct path`, async () => {
  await workspacesRequest.list()
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/workspaces`)
})

test(`Get workspaces has the correct query parameters`, async () => {
  await workspacesRequest.list({
    search: 'hola',
    page: 2,
    pageSize: 10
  })
  const params = new URL(axios.history.get[0].url).searchParams
  expect(params.get('search')).toBe('hola')
  expect(params.get('page')).toBe('2')
  expect(params.get('page_size')).toBe('10')
})

test(`Get specific workscape has the correct path and method`, async () => {
  await workspacesRequest.get({ id: '2' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/workspaces/2`)
  expect(axios.history.get[0].method).toBe('get')
})

test(`Create a workscape requires a title`, () => {
  // @ts-ignore
  expect(() => workspacesRequest.add({})).toThrow(`A name is required`)
})

test(`Create a workscape has the correct method`, async () => {
  await workspacesRequest.add({
    name: 'new workspace'
  })
  expect(axios.history.post[0].method).toBe(`post`)
})

test(`add a member to a workscape has the correct method and path`, async () => {
  await workspacesRequest.addMembers({
    id: '2',
    members: 'test@test.com'
  })
  expect(axios.history.patch[0].url).toBe(`${API_BASE_URL}/workspaces/2`)
  expect(axios.history.patch[0].method).toBe(`patch`)
})

test(`add a member to a workscape has the correct payload`, async () => {
  await workspacesRequest.addMembers({
    id: '2',
    members: ['test@test.com', 'test2@test.com']
  })
  const body = JSON.parse(axios.history.patch[0].data)
  expect(body).toEqual([
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    },
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test2@test.com'
      }
    }
  ])
  expect(body.length).toEqual(2)
})

test(`remove a member to a workscape has the correct payload`, async () => {
  await workspacesRequest.removeMembers({
    id: '2',
    members: ['test@test.com']
  })
  const body = JSON.parse(axios.history.patch[0].data)
  expect(body).toEqual([
    {
      op: 'remove',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
  expect(body.length).toEqual(1)
})

test(`Deleting a workscape has the correct path and method`, async () => {
  await workspacesRequest.delete({ id: '2' })
  expect(axios.history.delete[0].url).toBe(`${API_BASE_URL}/workspaces/2`)
  expect(axios.history.delete[0].method).toBe(`delete`)
})
