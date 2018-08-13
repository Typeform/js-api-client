import { isMemberPropValid, createMemberPatchQuery } from './utils'

export const teams = http => {
  return {
    get: () => {
      return getTeam(http)
    },
    addMembers: args => {
      return addMembers(http, args)
    },
    removeMembers: args => {
      return removeMembers(http, args)
    }
  }
}

export const getTeam = http => {
  return http.request({
    method: 'get',
    url: '/teams/mine'
  })
}

export const addMembers = (http, { members }) => {
  if (!isMemberPropValid(members)) {
    throw `No member provided`
  }

  const membersToAdd = !Array.isArray(members) ? [members] : members
  const membersQuery = createMemberPatchQuery({
    members: membersToAdd,
    operation: 'add'
  })

  return http.request({
    method: 'patch',
    url: '/teams/mine',
    data: membersQuery
  })
}

export const removeMembers = (http, { members }) => {
  if (!isMemberPropValid(members)) {
    throw `No member provided`
  }

  const membersToAdd = !Array.isArray(members) ? [members] : members
  const membersQuery = createMemberPatchQuery({
    members: membersToAdd,
    operation: 'remove'
  })

  return http.request({
    method: 'delete',
    url: '/teams/mine',
    data: membersQuery
  })
}
