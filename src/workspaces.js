import { isMemberPropValid, createMemberPatchQuery } from './utils'

export default http => new Workspaces(http)

class Workspaces {
  constructor (_http) {
    this._http = _http
  }

  add ({ name } = {}) {
    if (!name) {
      throw new Error(`A name is required`)
    }

    return this._http.request({
      method: 'post',
      url: '/workspaces',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name
      }
    })
  }

  addMembers ({ id, members } = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    })

    return this.update({ id, data: membersQuery })
  }

  delete ({ id } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/workspaces/${id}`
    })
  }

  get ({ id } = {}) {
    return this._http.request({
      method: 'get',
      url: `/workspaces/${id}`
    })
  }

  list ({ search, page, pageSize } = {}) {
    return this._http.request({
      method: 'get',
      url: '/workspaces',
      params: {
        page,
        page_size: pageSize,
        search
      }
    })
  }

  removeMembers ({ id, members } = {}) {
    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'remove'
    })

    return this.update({ id, data: membersQuery })
  }

  update ({ id, data } = {}) {
    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      data
    })
  }
}
