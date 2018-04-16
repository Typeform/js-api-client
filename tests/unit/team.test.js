import axios from 'axios'
import { stub, spy } from 'sinon'
import {
  getTeam,
  addMembers,
  removeMembers
} from '../../lib/team'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test('getTeam has the correct url in the request', () => {
  getTeam(axios)
  expect(axios.request.args[0][0].url).toBe('/teams/mine')
})

test('addMember will set the proper method', () => {
  addMembers(axios, { members: ['test@test.com'] })
  expect(axios.request.args[0][0].method).toBe('patch')
})

test('if a member is sent as string it will work as expected', () => {
  addMembers(axios, { members: 'test@test.com' })
  expect(axios.request.args[0][0].data).toEqual([
    {
      "op": "add",
      "path": "/members",
      "value": {
        "email": "test@test.com"
      }
    }
  ])
})

test('it will support array or multiple members at a time', () => {
  addMembers(axios, { members: ['test@test.com', 'test2@test.com']})
  expect(axios.request.args[0][0].data.length).toEqual(2)
  expect(axios.request.args[0][0].data).toEqual([
    {
      "op": "add",
      "path": "/members",
      "value": {
        "email": "test@test.com"
      }
    },
    {
      "op": "add",
      "path": "/members",
      "value": {
        "email": "test2@test.com"
      }
    }
  ])
})

test('if no members or incorrect format defined throws', () => {
  expect(() => addMembers(axios, { members:  {}})).toThrow()
})

//removeMember
test('removeMember will set the proper method', () => {
  removeMembers(axios, { members: ['test@test.com'] })
  expect(axios.request.args[0][0].method).toBe('delete')
})

test('if a member is sent as string it will work as expected', () => {
  removeMembers(axios, { members: 'test@test.com' })
  expect(axios.request.args[0][0].data).toEqual([
    {
      "op": "remove",
      "path": "/members",
      "value": {
        "email": "test@test.com"
      }
    }
  ])
})
