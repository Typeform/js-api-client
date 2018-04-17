import axios from 'axios'
import { stub, spy } from 'sinon'
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
  addMembers,
  removeMembers
} from '../../lib/workspaces'

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test(`Get workspaces has the correct path`, () => {
  getWorkspaces(axios)
  expect(axios.request.args[0][0].url).toBe(`/workspaces`)
})

test(`Get specific workscape has the correct path`, () => {
  getWorkspace(axios, { id: 2 })
  expect(axios.request.args[0][0].url).toBe(`/workspaces/2`)
})

test(`Create a workscape requires a title`, () => {
  expect(() => createWorkspace(axios, {})).toThrow(`A name is required`)
})

test(`Create a workscape has the correct method`, () => {
  createWorkspace(axios, {
    name: 'new workspace'
  })
  expect(axios.request.args[0][0].method).toBe(`post`)
})

test(`add a member to a workscape has the correct method and path`, () => {
  addMembers(axios, {
    id: 2,
    members: 'test@test.com'
  })
  expect(axios.request.args[0][0].method).toBe(`patch`)
  expect(axios.request.args[0][0].url).toBe(`/workspaces/2`)
})
test(`add a member to a workscape has the correct payload`, () => {
  addMembers(axios, {
    id: 2,
    members: ['test@test.com', 'test2@test.com']
  })
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
  expect(axios.request.args[0][0].data.length).toEqual(2)
})

test(`remove a member to a workscape has the correct payload`, () => {
  removeMembers(axios, {
    id: 2,
    members: ['test@test.com']
  })
  expect(axios.request.args[0][0].data).toEqual([
    {
      "op": "remove",
      "path": "/members",
      "value": {
        "email": "test@test.com"
      }
    }
  ])
  expect(axios.request.args[0][0].data.length).toEqual(1)
})
