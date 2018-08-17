export default http => ({
  list: () => getImages(http),
  get: args => getImage(http, args),
  add: args => addImage(http, args),
  delete: args => deleteImage(http, args)
})
const getImages = http => {
  return http.request({
    method: 'get',
    url: '/images'
  })
}

const getImage = (
  http,
  { id, returns, size, backgroundSize, choiceSize }
) => {
  let requestQuery = {
    method: 'get',
    url: `/images/${id}`
  }

  if (returns === 'json') {
    requestQuery.headers = {
      Accept: 'application/json'
    }
  }

  if (size !== undefined) {
    if (['default', 'thumbnail', 'mobile'].includes(size)) {
      requestQuery['url'] += `/image/${size}`
    } else {
      throw new Error(`Image size doesn't exists`)
    }
  }

  if (backgroundSize !== undefined) {
    if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
      requestQuery['url'] += `/background/${backgroundSize}`
    } else {
      throw new Error(`Image background size doesn't exists`)
    }
  }

  const choiceImageSizes = [
    'default',
    'thumbnail',
    'supersize',
    'supermobile',
    'supersizefit',
    'supermobilefit'
  ]
  if (choiceSize !== undefined) {
    if (choiceImageSizes.includes(choiceSize)) {
      requestQuery['url'] += `/choice/${choiceSize}`
    } else {
      throw new Error(`Image choice size doesn't exists`)
    }
  }

  return http.request(requestQuery)
}

const addImage = (http, { image, mediaType, fileName }) => {
  return http.request({
    method: 'post',
    url: `/images`,
    data: {
      image,
      file_name: fileName,
      media_type: mediaType
    }
  })
}

const deleteImage = (http, { id }) => {
  return http.request({
    method: 'delete',
    url: `/images/${id}`
  })
}
