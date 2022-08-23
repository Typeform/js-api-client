import { Typeform } from './typeform-types'
import { FONTS_AVAILABLE } from './constants'

export class Themes {
  constructor (private _http: Typeform.HTTPClient) { }

  public create (args: {
    id?: string, background?: Typeform.ThemeBackground, colors: Typeform.ThemeColors, font: string, hasTransparentButton?: boolean,
    name: string
  }): Promise<Typeform.Theme> {
    return createOrUpdateTheme(this._http, args)
  }

  public delete (args: { id: string }): Promise<null> {
    const { id } = args

    return this._http.request({
      method: 'delete',
      url: `/themes/${id}`
    })
  }

  public get (args: { id: string }): Promise<Typeform.Theme> {
    const { id } = args

    return this._http.request({
      method: 'get',
      url: `/themes/${id}`
    })
  }

  public list (args?: { page?: number, pageSize?: number }): Promise<Typeform.API.Themes.List> {
    const { page, pageSize } = args || { page: null, pageSize: null }

    return this._http.request({
      method: 'get',
      url: '/themes',
      params: {
        page,
        page_size: pageSize
      }
    })
  }

  public update (
    args: {
      id?: string, background?: Typeform.ThemeBackground, colors: Typeform.ThemeColors, font: string, hasTransparentButton?: boolean,
      name: string
    }
  ): Promise<Typeform.Theme> {
    return createOrUpdateTheme(this._http, args)
  }
}

const createOrUpdateTheme = (
  http: Typeform.HTTPClient,
  args: {
    id?: string, background?: Typeform.ThemeBackground, colors: Typeform.ThemeColors, font: string, hasTransparentButton?: boolean,
    name: string
  }
): Promise<Typeform.Theme> => {
  const { id, background, colors, font, hasTransparentButton, name } = args
  // check if required properties are defined
  const requiredProperties = { name, font, colors }
  Object.getOwnPropertyNames(requiredProperties).forEach((property) => {
    if (!requiredProperties[property]) {
      throw new Error(`The property, ${property}, is required`)
    }
  })

  if (!FONTS_AVAILABLE.includes(font as Typeform.Font)) {
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
