import { Response } from 'express'

import {
  expressWebhook,
  RequestWithTypeformSignatureValidation,
} from '../../src/express-middleware'

describe('#expressWebhook', () => {
  process.env.TYPEFORM_WEBHOOK_SECRET = 'my-webook-secret'

  test('should block access without valid signature', () => {
    const req = {
      headers: {},
      body: {
        foo: 'bar',
      },
    } as never
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as never
    const next = jest.fn()

    expressWebhook()(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.end).toHaveBeenCalledTimes(1)
    expect(
      (req as RequestWithTypeformSignatureValidation).typeformSignatureIsValid
    ).toBe(false)
  })

  test('should only warn on valid signature based on config', () => {
    const req = {
      headers: {},
      body: {
        foo: 'bar',
      },
    } as never
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as never
    const next = jest.fn()
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementationOnce(() => {})

    expressWebhook({ warn: true })(req, res, next)
    expect(consoleWarnSpy.mock.calls[0][0]).toMatch(
      'webhook signature verification failed'
    )
    expect(res.status).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
    expect(
      (req as RequestWithTypeformSignatureValidation).typeformSignatureIsValid
    ).toBe(false)
  })

  test('should allow access with valid signature', () => {
    const req = {
      headers: {
        'typeform-signature':
          'sha256=FhVodsSGB+QthTXIf8EZYpoPTiu8+Zfr1wVcD3Ii75A=',
      },
      body: {
        foo: 'bar',
      },
    } as never
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as never
    const next = jest.fn()

    expressWebhook()(req, res, next)
    expect(res.status).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
    expect(
      (req as RequestWithTypeformSignatureValidation).typeformSignatureIsValid
    ).toBe(true)
  })

  test('should use custom secret from config for validation', () => {
    const req = {
      headers: {
        'typeform-signature':
          'sha256=HzxMTtYAfEJLDW/2zaHNZDTn1m0dtbWFlOqmkKe6LT4=',
      },
      body: {
        foo: 'bar',
      },
    } as never
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as never
    const next = jest.fn()

    expressWebhook({ secret: 'custom-secret' })(req, res, next)
    expect(res.status).toHaveBeenCalledTimes(0)
    expect(res.end).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
    expect(
      (req as RequestWithTypeformSignatureValidation).typeformSignatureIsValid
    ).toBe(true)
  })
})
