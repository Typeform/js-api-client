import axios from 'axios'
import { API_BASE_URL } from './constants'
import { Typeform } from './typeform-types'

export const clientConstructor = ({ token, ...options }: Typeform.ClientArg): Typeform.HTTPClient => {
  return {
    request: (args: Typeform.Request) => {
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

      // @ts-ignore
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
        .then((response: any) => response.data)
        .catch((error: any) => {
          if (error && error.response && error.response.data && error.response.data.description) {
            throw new Error(error.response.data.description)
          } else {
            throw new Error('Couldn\'t make request')
          }
        })
    }
  }
}

export const buildUrlWithParams = (url: string, params: Typeform.DocumentData = {}): string => {
  const queryParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

  return queryParams ? `${url}?${queryParams}` : url
}
