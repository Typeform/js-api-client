import {
  clientConstructor
} from './create-client'
import {
  getForms,
  getForm,
  createForm,
  updateForm,
  deleteForm
} from './forms'
import {
  getImages,
  getImage,
  addImage,
  deleteImage
} from './images'
import {
  team
} from './teams'

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
    getImages: () => {
      return getImages(http)
    },
    addImage: (args) => {
      return adddImage(http, args)
    },
    deleteImage: (args) => {
      return deleteImage(http, args)
    },
    team: () => {
      return team(http)
    }
  }
}
