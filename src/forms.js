export default http => new Form(http)

class Form {
  constructor (_http) {
    this._http = _http
    this._messages = new FormMessages(_http)
  }

  get messages () {
    return this._messages
  }

  create ({ data } = {}) {
    return this._http.request({
      method: 'post',
      url: `/forms`,
      data
    })
  }

  delete ({ uid } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}`
    })
  }

  get ({ uid } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}`
    })
  }

  list ({ page, pageSize, search, workspaceId } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms`,
      params: {
        page,
        page_size: pageSize,
        search,
        workspace_id: workspaceId
      }
    })
  }

  update ({ uid, override, data } = {}) {
    const methodType = override ? 'put' : 'patch'

    return this._http.request({
      method: methodType,
      url: `/forms/${uid}`,
      data
    })
  }
}

class FormMessages {
  constructor (_http) {
    this._http = _http
  }

  get ({ uid } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/messages`
    })
  }

  update ({ uid, data } = {}) {
    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/messages`,
      data
    })
  }
}
