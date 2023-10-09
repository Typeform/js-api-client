import { clientConstructor } from './create-client'
import { Forms } from './forms'
import { Images } from './images'
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
    themes: new Themes(http),
    workspaces: new Workspaces(http),
    responses: new Responses(http),
    webhooks: new Webhooks(http),
  }
}

export { verifySignature } from './verify-signature'
export { expressWebhook } from './express-middleware'
