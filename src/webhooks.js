export class Webhooks {
  constructor (_http) {
    this._http = _http
  }

  create (args) {
    return createOrUpdateWebhook(this._http, args)
  }

  delete ({ uid, tag } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/webhooks/${tag}`
    })
  }

  get ({ uid, tag } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks/${tag}`
    })
  }

  list ({ uid } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks`
    })
  }

  update (args) {
    return createOrUpdateWebhook(this._http, args)
  }
}

const createOrUpdateWebhook = (http, { uid, tag, url, enable = false, secret, verifySSL } = {}) => {
  if (!url) {
    throw new Error(`Please provide an url for ${tag}`)
  }

  if (!tag) {
    throw new Error(`Please provide a tag name for the webhook`)
  }

  return http.request({
    method: 'put',
    url: `/forms/${uid}/webhooks/${tag}`,
    data: {
      url,
      enable,
      secret,
      verify_ssl: verifySSL ? true : undefined
    }
  })
}
