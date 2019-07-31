export default http => new Images(http)

class Images {
  constructor (_http) {
    this._http = _http
  }

  add ({ image, url, fileName } = {}) {
    return this._http.request({
      method: 'post',
      url: `/images`,
      data: {
        image,
        file_name: fileName,
        url
      }
    })
  }

  delete ({ id } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/images/${id}`
    })
  }

  get ({ id, size, backgroundSize, choiceSize } = {}) {
    const requestQuery = {
      method: 'get',
      url: `/images/${id}`,
      headers: {
        Accept: 'application/json'
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

    if (size) {
      if (['default', 'thumbnail', 'mobile'].includes(size)) {
        requestQuery.url += `/image/${size}`
      } else {
        throw new Error(`Image size doesn't exist`)
      }
    } else if (backgroundSize) {
      if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
        requestQuery.url += `/background/${backgroundSize}`
      } else {
        throw new Error(`Image background size doesn't exist`)
      }
    } else if (choiceSize) {
      if (choiceImageSizes.includes(choiceSize)) {
        requestQuery.url += `/choice/${choiceSize}`
      } else {
        throw new Error(`Image choice size doesn't exist`)
      }
    }

    return this._http.request(requestQuery)
  }

  list () {
    return this._http.request({
      method: 'get',
      url: '/images'
    })
  }
}
