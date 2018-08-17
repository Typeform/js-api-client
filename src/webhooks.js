export default http => ({
  get: args => getWebhook(http, args),
  create: args => createWebhook(http, args),
  update: args => updateWebhook(http, args),
  delete: args => deleteWebhook(http, args)
})

const getWebhook = (http, { uid, tag }) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}/webhooks/${tag}`
  })
}

const createWebhook = (http, args) => {
  return createOrUpdateWebhook(http, args)
}

const updateWebhook = (http, args) => {
  return createOrUpdateWebhook(http, args)
}

const deleteWebhook = (http, { uid, tag }) => {
  return http.request({
    method: 'delete',
    url: `/forms/${uid}/webhooks/${tag}`
  })
}

const createOrUpdateWebhook = (
  http,
  { uid, tag, url, enable = false }
) => {
  if (url === undefined) {
    throw new Error(`Please provide an url for ${tag}`)
  }
  if (tag === undefined) {
    throw new Error(`Please provide a tag name for the webhook`)
  }
  return http.request({
    method: 'put',
    url: `/forms/${uid}/webhooks/${tag}`,
    data: {
      url,
      enable
    }
  })
}
