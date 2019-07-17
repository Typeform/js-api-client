/* globals fetch */
import 'isomorphic-fetch'
import { API_BASE_URL } from './constants'
import { buildUrlWithParams } from './utils';

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
        .then(handleResponse)
        .catch(error => { throw new Error(error) })
    }
  }
}

const handleResponse = (response) => {
    if (response.status == 204) {
        return;
    }
    return response.json();
}
