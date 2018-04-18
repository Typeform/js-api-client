import axios from 'axios'

export const clientConstructor = ({ token }) => {
  return axios.create({
    baseURL: 'https://api.typeform.com',
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
}
