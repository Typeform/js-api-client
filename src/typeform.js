import { clientConstructor } from './create-client'
import { forms } from './forms'
import { images } from './images'
import { teams } from './teams'
import { themes } from './themes'
import { workspace } from './workspaces'

export const createClient = (args = {}) => {
  if (args.token === undefined) {
    throw 'Token is missing'
  }

  const http = clientConstructor(args)

  return {
    forms: forms(http),
    images: images(http),
    teams: teams(http),
    themes: themes(http),
    workspaces: workspaces(http)
  }
}

export default createClient
