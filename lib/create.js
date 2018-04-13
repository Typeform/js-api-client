import axios from 'axios'

export const getForms = (http) => {
  return http.request({
    method: 'get',
    url: `/forms`
  })
}

export const getForm = (http, { uid }) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}`
  })
}

export const updateForm = (http, { uid, override, data }) => {

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

export const deleteForm = (http, {uid}) => {
  return http.request({
    method: 'delete',
    url: `/forms/${uid}`
  })
}
