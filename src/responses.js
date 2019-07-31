export default http => new Responses(http)

class Responses {
  constructor (_http) {
    this._http = _http
  }

  delete ({ uid, ids }) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/responses`,
      params: {
        included_tokens: toCSL(ids)
      }
    })
  }

  list ({ uid, pageSize, since, until, after, before, ids, completed, sort, query, fields } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/responses`,
      params: {
        page_size: pageSize,
        since,
        until,
        after,
        before,
        included_response_ids: toCSL(ids),
        completed,
        sort,
        query,
        fields: toCSL(fields)
      }
    })
  }
}

const toCSL = (args) => {
  if (!args || !(typeof args === 'string' || Array.isArray(args))) {
    return null
  }

  return (typeof args === 'string') ? args : args.join(',')
}
