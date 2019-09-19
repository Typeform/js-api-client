import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Teams } from '../../src/teams'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const teamsRequest = new Teams(http)

test('getTeam has the correct url in the request', async () => {
  await teamsRequest.get()
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/teams/mine`)
})

test('addMember will set the proper method', async () => {
  await teamsRequest.addMembers({ members: ['test@test.com'] })
  expect(axios.history.patch[0].method).toBe('patch')
})

test('if a member is sent as string it will work as expected', async () => {
  await teamsRequest.addMembers({ members: 'test@test.com' })
  const addMemberData = JSON.parse(axios.history.patch[0].data)
  expect(addMemberData).toEqual([
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
})

test('it will support array or multiple members at a time', async () => {
  await teamsRequest.addMembers({ members: ['test@test.com', 'test2@test.com'] })
  const addMembersData = JSON.parse(axios.history.patch[0].data)
  expect(addMembersData).toEqual([
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
  // @ts-ignore
  expect(() => teamsRequest.addMembers({ members: {} })).toThrow()
})

test('removeMember will set the proper method', async () => {
  await teamsRequest.removeMembers({ members: ['test@test.com'] })
  expect(axios.history.delete[0].method).toBe('delete')
})

test('if a member is sent as string it will work as expected', async () => {
  await teamsRequest.removeMembers({ members: 'test@test.com' })
  const removeMemberData = JSON.parse(axios.history.delete[0].data)
  expect(removeMemberData).toEqual([
    {
      op: 'remove',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ])
})
