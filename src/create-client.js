/* globals fetch */
import 'isomorphic-fetch'
import { API_BASE_URL } from './constants'

export const clientConstructor = ({ token, ...options }) => {
  return {
    request: (args) => {
      const {
        url,
        headers: argsHeaders = {},
        ...otherArgs
      } = args

      const {
        headers = {}
      } = options

      const requestParameters = {
        ...options,
        ...otherArgs
      }

      return fetch(`${API_BASE_URL}${url}`, {
        ...requestParameters,
        headers: {
          ...headers,
          ...argsHeaders,
          Authorization: `bearer ${token}`
        }
      })
        .then(response => response.json())
        .catch(error => { throw new Error(error) })
    }
  }
}
