import axios from 'axios'

import { API_BASE_URL } from './constants'
import { Typeform } from './typeform-types'
export const clientConstructor = ({
  token,
  ...options
}: Typeform.ClientArg = {}): Typeform.HTTPClient => {
  return {
    request: (args: Typeform.Request) => {
      const {
        url,
        data,
        headers: argsHeaders = {},
        params,
        ...otherArgs
      } = args

      const { apiBaseUrl } = options
      const requestApiBaseUrl = apiBaseUrl || API_BASE_URL
      const requestUrl = buildUrlWithParams(
        `${requestApiBaseUrl}${url}`,
        params
      )

      const { headers = {} } = options
      const authorization = token ? { Authorization: `bearer ${token}` } : {}
      const requestParameters = { ...options, ...otherArgs }

      return axios({
        url: requestUrl,
        ...requestParameters,
        data,
        headers: {
          Accept: 'application/json, text/plain, */*',
          ...headers,
          ...argsHeaders,
          ...authorization,
        },
      })
        .then((response) => response.data)
        .catch((error) => {
          const {
            code,
            description = "Couldn't make request",
            details,
          } = error?.response?.data || {}
          throw new Typeform.ApiError(code, description, details)
        })
    },
  }
}

export const buildUrlWithParams = (
  url: string,
  params: Typeform.DocumentData = {}
): string => {
  const queryParams = Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&')

  return queryParams ? `${url}?${queryParams}` : url
}
