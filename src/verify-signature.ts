import { createHmac } from 'crypto'

// https://www.typeform.com/developers/webhooks/secure-your-webhooks/
export const verifySignature = (
  signature: string = '',
  payload: string = '',
  secret: string = ''
): boolean => {
  const hash = createHmac('sha256', secret).update(payload).digest('base64')
  return signature === `sha256=${hash}`
}
