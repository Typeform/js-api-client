export const getImages = (http) => {
  return http.request({
    method: 'get',
    url: '/images'
  })
}

export const getImage = (http, { id }) => {
  return http.request({
    method: 'get',
    url: `/images/${id}`
  })
}

export const addImage = (http, { image, media_type, file_name }) => {
  return http.request({
    method: 'post',
    url: `/images`,
    data: {
      image,
      file_name,
      media_type
    }
  })
}

export const removeImage = (http, { id }) => {
  return http.request({
    method: 'delete',
    url: `/images/${id}`
  })
}
