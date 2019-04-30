import { isMemberPropValid, createMemberPatchQuery } from './utils'

export default http => new Teams(http)

class Teams {
  constructor (_http) {
    this._http = _http
  }

  get () {
    return this._http.request({
      method: 'get',
      url: '/teams/mine'
    })
  }

  addMembers ({ members } = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    })

    return this._http.request({
      method: 'patch',
      url: '/teams/mine',
      data: membersQuery
    })
  }

  removeMembers ({ members }) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToRemove = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToRemove,
      operation: 'remove'
    })

    return this._http.request({
      method: 'delete',
      url: '/teams/mine',
      data: membersQuery
    })
  }
}
