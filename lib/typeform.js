import {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm
} from './create'
import {
  clientConstructor
} from './create-client'

export const createClient = (args = {}) => {

  if(args.token === undefined) {
    throw 'Token is missing'
  }

  const http = clientConstructor(args)

  return {
    getForms: () => {
      return getForms(http)
    },
    getForm: (args) => {
      return getForm(http, args)
    },
    createForm: (args) => {
      return createForm(http, args)
    },
    updateForm: (args) => {
      return updateForm(http, args)
    },
    updateForm: (args) => {
      return updateForm(http, args)
    },
    deleteForm: (args) => {
      return deleteForm(http, args)
    },
  }
}
