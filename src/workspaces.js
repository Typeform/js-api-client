import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class Workspaces {
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
    const data = addOrRemoveMembers('add', members)
    return this.update({ id, data })
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
    const data = addOrRemoveMembers('remove', members)
    return this.update({ id, data })
  }

  update ({ id, data } = {}) {
    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }
}

const addOrRemoveMembers = (operation, members) => {
  if (!isMemberPropValid(members)) {
    throw new Error(`No member(s) provided`)
  }

  const membersToAdd = !Array.isArray(members) ? [members] : members
  return createMemberPatchQuery({
    members: membersToAdd,
    operation
  })
}
