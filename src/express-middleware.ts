import { Request, Response, NextFunction } from 'express'

import { verifySignature } from './verify-signature'

export interface WebhookMiddlewareConfig {
  secret?: string
  warn?: boolean
}

export interface RequestWithTypeformSignatureValidation extends Request {
  typeformSignatureIsValid: boolean
}

export const expressWebhook = ({
  secret,
  warn = false,
}: WebhookMiddlewareConfig = {}) => {
  const { raw } = require('express')
  const parseRawBody = raw({ type: 'application/json' })

  return (req: Request, res: Response, next: NextFunction) => {
    parseRawBody(req, res, () => {
      const signature = `${req.headers['typeform-signature']}`
      const isValid = verifySignature(
        signature,
        req.body.toString(),
        secret ?? process.env.TYPEFORM_WEBHOOK_SECRET
      )

      ;(
        req as RequestWithTypeformSignatureValidation
      ).typeformSignatureIsValid = isValid

      if (isValid) {
        next()
      } else if (warn) {
        // eslint-disable-next-line no-console
        console.warn(
          `Warning: Typeform webhook signature verification failed for ${req.originalUrl}`
        )
        next()
      } else {
        res.status(400).end()
      }
    })
  }
}
