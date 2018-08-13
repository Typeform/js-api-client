import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import teams from '../../src/teams'

beforeEach(() => {
  fetch.resetMocks()
})

const http = clientConstructor({
  token: '123'
})
const teamsRequest = teams(http)

test('getTeam has the correct url in the request', () => {
  teamsRequest.get()
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/teams/mine`)
})

test('addMember will set the proper method', () => {
  teamsRequest.addMembers({ members: ['test@test.com'] })
  expect(fetch.mock.calls[0][1].method).toBe('patch')
})

test('if a member is sent as string it will work as expected', () => {
  teamsRequest.addMembers({ members: 'test@test.com' })
  expect(fetch.mock.calls[0][1].data).toEqual([
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
})

test('it will support array or multiple members at a time', () => {
  teamsRequest.addMembers({ members: ['test@test.com', 'test2@test.com'] })
  expect(fetch.mock.calls[0][1].data.length).toEqual(2)
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
})

test('if no members or incorrect format defined throws', () => {
  expect(() => teamsRequest.addMembers({ members: {} })).toThrow()
})

//removeMember
test('removeMember will set the proper method', () => {
  teamsRequest.removeMembers({ members: ['test@test.com'] })
  expect(fetch.mock.calls[0][1].method).toBe('delete')
})

test('if a member is sent as string it will work as expected', () => {
  teamsRequest.removeMembers({ members: 'test@test.com' })
  expect(fetch.mock.calls[0][1].data).toEqual([
    {
      op: 'remove',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
})
