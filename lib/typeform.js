import axios from 'axios'
import {
  getForm,
  updateForm,
  deleteForm
} from './create'

export const createClient = (args = {}) => {

  if(args.token === undefined) {
    throw 'Token is missing'
  }

  const {
    token
  } = args

  const http = axios.create({
    baseURL: 'https://api.typeform.com',
    timeout: 1000,
    headers: {
      'Authorization': `bearer ${token}`
    }
  })

  return {
    getForms: (args) => {
      return getForms(http)
    },
    getForm: (args) => {
      return getForm(http, { ...args })
    },
    updateForm: (args) => {
      return updateForm(http, { ...args })
    },
    updateForm: (args) => {
      return updateForm(http, { ...args })
    },
  }
}
