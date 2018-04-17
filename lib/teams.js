export const teams = (http) => {
  return {
    get(http) {
      return getTeam(http)
    },
    addMembers(http, args) {
      return addMembers(http, args)
    },
    removeMembers(http, args) {
      return addMembers(http, args)
    }
  }
} 

export const getTeam = (http) => {
  return http.request({
    method: 'get',
    url: '/teams/mine'
  })
}

export const addMembers = (http, {members}) => {
  if(!isMemberPropValid(members)) {
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

export const removeMembers = (http, {members}) => {
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

const isMemberPropValid = (members) => {
  if (members === undefined) {
    throw `An user email is at least needed`
  }

  if (!(typeof members === 'string' || Array.isArray(members))) {
    throw `Bad formatted member list`
  }

  return !Array.isArray(members) ? [members] : members
}

const createMemberPatchQuery = ({members, operation}) => {
  return members.map((member) => ({
    "op": operation,
    "path": "/members",
    "value": {
      "email": member
    }
  }))
}
