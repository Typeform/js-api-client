import { clientConstructor } from './create-client'
import { Forms } from './forms'
import { Images } from './images'
import { Teams } from './teams'
import { Account } from './account'
import { Themes } from './themes'
import { Workspaces } from './workspaces'
import { Responses } from './responses'
import { Webhooks } from './webhooks'
import { Typeform } from './typeform-types'

export { Typeform } from './typeform-types'

export const createClient = (args: Typeform.ClientArg = { token: null }) => {
  const http = clientConstructor(args)

  return {
    forms: new Forms(http),
    images: new Images(http),
    teams: new Teams(http),
    account: new Account(http),
    themes: new Themes(http),
    workspaces: new Workspaces(http),
    responses: new Responses(http),
    webhooks: new Webhooks(http)
  }
}
