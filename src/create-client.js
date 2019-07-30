/* globals fetch */
import 'isomorphic-fetch'
import { API_BASE_URL } from './constants'

export const clientConstructor = ({ token, ...options }) => {
  return {
    request: (args) => {
      const {
        url,
        data,
        headers: argsHeaders = {},
        params,
        ...otherArgs
      } = args

      const requestUrl = buildUrlWithParams(`${API_BASE_URL}${url}`, params)

      const {
        headers = {}
      } = options

      const requestParameters = {
        ...options,
        ...otherArgs
      }

      return fetch(requestUrl, {
        ...requestParameters,
        body: JSON.stringify(data),
        headers: {
          ...headers,
          ...argsHeaders,
          Authorization: `bearer ${token}`
        }
      })
        .then(response => response.json())
    }
  }
}

export const buildUrlWithParams = (url, params = {}) => {
  const queryParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  return queryParams ? `${url}?${queryParams}` : url
}
