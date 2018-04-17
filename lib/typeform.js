import {
  clientConstructor
} from './create-client'
import {
  forms
} from './forms'
import {
  images
} from './images'
import {
  teams
} from './teams'

export const createClient = (args = {}) => {

  if(args.token === undefined) {
    throw 'Token is missing'
  }

  const http = clientConstructor(args)

  return {
    forms: forms(http),
    images: images(http),
    teams: teams(http)
  }
}
