export const webhooks = http => ({
  list: args => getResponses(http, args)
})

export const getWebhook = (http, { uid, tag }) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}/webhooks/${tag}`
  })
}

export const createWebhook = (http, args) => {
  return createOrUpdateWebhook(http, args)
}

export const updateWebhook = (http, args) => {
  return createOrUpdateWebhook(http, args)
}

export const deleteWebhook = (http, { uid, tag }) => {
  return http.request({
    method: 'delete',
    url: `/forms/${uid}/webhooks/${tag}`
  })
}

export const createOrUpdateWebhook = (
  http,
  { uid, tag, url, enable = false }
) => {
  if (url === undefined) {
    throw `Please provide an url for ${tag}`
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
