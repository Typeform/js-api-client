import axios from 'axios'
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

      return axios({
        url: requestUrl,
        ...requestParameters,
        data,
        headers: {
          Accept: 'application/json, text/plain, */*',
          ...headers,
          ...argsHeaders,
          Authorization: `bearer ${token}`
        }
      })
        .then(response => response.data)
        .catch(error => {
          if (error && error.response && error.response.data && error.response.data.description) {
            throw new Error(error.response.data.description)
          } else {
            throw new Error('Couldn\'t make request')
          }
        })
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
