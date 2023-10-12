import { Typeform } from './typeform-types'
import { FONTS_AVAILABLE } from './constants'
import { autoPageItems } from './auto-page-items'

export class Themes {
  constructor(private _http: Typeform.HTTPClient) {}

  public create(args: {
    background?: Typeform.ThemeBackground
    colors: Typeform.ThemeColors
    font: Typeform.Font
    hasTransparentButton?: boolean
    name: string
    fields?: Typeform.ThemeFontSizeAndAlignment
    screens?: Typeform.ThemeFontSizeAndAlignment
    roundedCorners?: Typeform.ThemeRoundedCorners
  }): Promise<Typeform.Theme> {
    return createOrUpdateTheme(this._http, args)
  }

  public delete(args: { id: string }): Promise<null> {
    const { id } = args

    return this._http.request({
      method: 'delete',
      url: `/themes/${id}`,
    })
  }

  public get(args: { id: string }): Promise<Typeform.Theme> {
    const { id } = args

    return this._http.request({
      method: 'get',
      url: `/themes/${id}`,
    })
  }

  public list(args?: {
    page?: number | 'auto'
    pageSize?: number
  }): Promise<Typeform.API.Themes.List> {
    const { page, pageSize } = args || { page: null, pageSize: null }

    const request = (page: number, pageSize: number) =>
      this._http.request({
        method: 'get',
        url: '/themes',
        params: {
          page,
          page_size: pageSize,
        },
      })

    if (page === 'auto') {
      return autoPageItems(request)
    }

    return request(page, pageSize)
  }

  public update(args: {
    id: string
    background?: Typeform.ThemeBackground
    colors: Typeform.ThemeColors
    font: Typeform.Font
    hasTransparentButton?: boolean
    name: string
    fields?: Typeform.ThemeFontSizeAndAlignment
    screens?: Typeform.ThemeFontSizeAndAlignment
    roundedCorners?: Typeform.ThemeRoundedCorners
  }): Promise<Typeform.Theme> {
    if (!args.id) {
      throw new Error(`The property id is required`)
    }
    return createOrUpdateTheme(this._http, args)
  }
}

const createOrUpdateTheme = (
  http: Typeform.HTTPClient,
  args: {
    id?: string
    background?: Typeform.ThemeBackground
    colors: Typeform.ThemeColors
    font: Typeform.Font
    hasTransparentButton?: boolean
    name: string
    fields?: Typeform.ThemeFontSizeAndAlignment
    screens?: Typeform.ThemeFontSizeAndAlignment
    roundedCorners?: Typeform.ThemeRoundedCorners
  }
): Promise<Typeform.Theme> => {
  const {
    id,
    background,
    colors,
    font,
    hasTransparentButton,
    name,
    fields,
    screens,
    roundedCorners,
  } = args
  // check if required properties are defined
  const requiredProperties: Typeform.Theme = { name, font, colors }
  Object.getOwnPropertyNames(requiredProperties).forEach(
    (property: keyof Typeform.Theme) => {
      if (!requiredProperties[property]) {
        throw new Error(`The property, ${property}, is required`)
      }
    }
  )

  if (!FONTS_AVAILABLE.includes(font as Typeform.Font)) {
    throw new Error(`${font} is not a valid font`)
  }

  return http.request({
    method: id ? 'put' : 'post',
    url: id ? `/themes/${id}` : '/themes',
    data: {
      background,
      colors,
      font,
      has_transparent_button: !!hasTransparentButton,
      fields,
      screens,
      rounded_corners: roundedCorners,
      name,
    },
  })
}
