import { FONTS_AVAILABLE } from './constants'

export default http => ({
  list: args => getThemes(http, args),
  get: args => getTheme(http, args),
  create: args => createTheme(http, args),
  delete: args => deleteTheme(http, args),
  update: args => updateTheme(http, args)
})

const getThemes = (http, { page, page_size } = {}) => {
  return http.request({
    method: 'get',
    url: '/themes',
    params: {
      page,
      page_size
    }
  })
}

const getTheme = (http, { id }) => {
  return http.request({
    method: 'get',
    url: `/themes/${id}`
  })
}

const createTheme = (
  http,
  { background, colors, font, has_transparent_button, name }
) => {
  //check if required properties are defined
  if ([name, font, colors].includes(undefined)) {
    throw `Please add the required fields`
  }

  if (!FONTS_AVAILABLE.includes(font)) {
    throw `It's not a valid font`
  }

  return http.request({
    method: 'post',
    url: `/themes`,
    background,
    colors,
    font,
    has_transparent_button,
    name
  })
}

const deleteTheme = (http, { id }) => {
  return http.request({
    method: 'delete',
    url: `/themes/${id}`
  })
}

const updateTheme = (
  http,
  { id, background, colors, font, has_transparent_button, name }
) => {
  //check if required properties are defined
  if ([name, font, colors].includes(undefined)) {
    throw `Please add the required fields`
  }

  if (!FONTS_AVAILABLE.includes(font)) {
    throw `It's not a valid font`
  }

  return http.request({
    method: 'put',
    url: `/themes/${id}`,
    background,
    colors,
    font,
    has_transparent_button,
    name
  })
}
