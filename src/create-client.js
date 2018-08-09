import axios from 'axios'

export const clientConstructor = ({ token, ...options }) => {
  return axios.create({
    baseURL: 'https://api.typeform.com',
    headers: {
      Authorization: `bearer ${token}`
    },
    ...options
  })
}
