import 'isomorphic-fetch'
import { API_BASE_URL } from './constants'

export const clientConstructor = ({ token, ...options }) => {
  return {
    request: (args) => {

      const {
        url,
        ...otherArgs
      } = args

      const requestParameters = {
        ...options,
        ...otherArgs
      }

      return fetch(`${API_BASE_URL}${url}`, {
        headers: {
          Authorization: `bearer ${token}`
        },
        ...requestParameters
      })
        .then(response => response.json())
      .catch(error => { throw `${error}` })
    }
  }
}
