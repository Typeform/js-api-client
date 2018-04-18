import axios from 'axios'

export const forms = http => ({
  list: args => getForms(http, args),
  get: args =>  getForm(http, args),
  update: args => updateForm(http, args),
  delete: args => deleteForm(http, args),
  create: args => createForm(http, args),
  messages: {
    get: args => getMessages(http, args),
    update: args => updateMessages(http, args)
  }
})

export const getForms = (http, { page, page_size, search } = {}) => {
  return http.request({
    method: 'get',
    url: `/forms`,
    page,
    page_size,
    search
  })
}

export const getForm = (http, { uid }) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}`
  })
}

export const updateForm = (http, { uid, override, data } = {}) => {

  let methodType = 'patch'
  if(override) {
    methodType = 'put'
  }

  return http.request({
    method: methodType,
    url: `/forms/${uid}`,
    data
  })
}

export const createForm = (http, { data } = {}) => {
  return http.request({
    method: 'post',
    url: `/forms`,
    data
  })
}

export const deleteForm = (http, {uid}) => {
  return http.request({
    method: 'delete',
    url: `/forms/${uid}`
  })
}

export const getMessages = (http, { uid }) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}/messages`
  })
}

export const updateMessages = (http, { uid }) => {
  return http.request({
    method: 'put',
    url: `/forms/${uid}/messages`
  })
}
