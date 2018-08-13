import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import workspaces from '../../src/workspaces'

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
})

const http = clientConstructor({
  token: '123'
})
const workspacesRequest = workspaces(http)


test(`Get workspaces has the correct path`, () => {
  workspacesRequest.list()
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/workspaces`)
})

test(`Get specific workscape has the correct path and method`, () => {
  workspacesRequest.get({ id: 2 })
  expect(fetch.mock.calls[0][1].method).toBe(`get`)
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/workspaces/2`)
})

test(`Create a workscape requires a title`, () => {
  expect(() => workspacesRequest.add({})).toThrow(`A name is required`)
})

test(`Create a workscape has the correct method`, () => {
  workspacesRequest.add({
    name: 'new workspace'
  })
  expect(fetch.mock.calls[0][1].method).toBe(`post`)
})

test(`add a member to a workscape has the correct method and path`, () => {
  workspacesRequest.addMembers({
    id: 2,
    members: 'test@test.com'
  })
  expect(fetch.mock.calls[0][1].method).toBe(`patch`)
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/workspaces/2`)
})
test(`add a member to a workscape has the correct payload`, () => {
  workspacesRequest.addMembers({
    id: 2,
    members: ['test@test.com', 'test2@test.com']
  })
  expect(fetch.mock.calls[0][1].data).toEqual([
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
  expect(fetch.mock.calls[0][1].data.length).toEqual(2)
})

test(`remove a member to a workscape has the correct payload`, () => {
  workspacesRequest.removeMembers({
    id: 2,
    members: ['test@test.com']
  })
  expect(fetch.mock.calls[0][1].data).toEqual([
    {
      op: 'remove',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
  expect(fetch.mock.calls[0][1].data.length).toEqual(1)
})

test(`Deleting a workscape has the correct path and method`, () => {
  workspacesRequest.delete({ id: 2 })
  expect(fetch.mock.calls[0][1].method).toBe(`delete`)
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/workspaces/2`)
})
