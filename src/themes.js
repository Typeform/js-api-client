import { FONTS_AVAILABLE } from './constants'

export default http => new Themes(http)

class Themes {
  constructor (_http) {
    this._http = _http
  }

  create ({ background, colors, font, hasTransparentButton, name } = {}) {
    // check if required properties are defined
    if ([name, font, colors].includes(undefined)) {
      throw new Error(`Please add the required fields`)
    }

    if (!FONTS_AVAILABLE.includes(font)) {
      throw new Error(`${font} is not a valid font`)
    }

    return this._http.request({
      method: 'post',
      url: `/themes`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    })
  }

  delete ({ id } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/themes/${id}`
    })
  }

  get ({ id } = {}) {
    return this._http.request({
      method: 'get',
      url: `/themes/${id}`
    })
  }

  list ({ page, pageSize } = {}) {
    return this._http.request({
      method: 'get',
      url: '/themes',
      params: {
        page,
        page_size: pageSize
      }
    })
  }

  update ({ id, background, colors, font, hasTransparentButton, name } = {}) {
    // check if required properties are defined
    const requiredProperties = { name, font, colors }
    Object.getOwnPropertyNames(requiredProperties).forEach((property) => {
      if (!requiredProperties[property]) {
        throw new Error(`The property, ${property}, is required`)
      }
    })

    if (!FONTS_AVAILABLE.includes(font)) {
      throw new Error(`${font} is not a valid font`)
    }

    return this._http.request({
      method: 'put',
      url: `/themes/${id}`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    })
  }
}
