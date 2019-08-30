import { FONTS_AVAILABLE } from './constants'

export class Themes {
  constructor (_http) {
    this._http = _http
  }

  create (args) {
    return createOrUpdateTheme(this._http, args)
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

  update (args) {
    return createOrUpdateTheme(this._http, args)
  }
}

const createOrUpdateTheme = (http, { id, background, colors, font, hasTransparentButton, name } = {}) => {
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

  return http.request({
    method: id ? 'put' : 'post',
    url: id ? `/themes/${id}` : '/themes',
    background,
    colors,
    font,
    has_transparent_button: !!hasTransparentButton,
    name
  })
}
