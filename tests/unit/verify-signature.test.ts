import { verifySignature } from '../../src'

describe('#verifySignature ', () => {
  const payload = JSON.stringify({ foo: 'bar' })
  const secret = 'my-webook-secret'

  test('should return true', () => {
    expect(
      verifySignature(
        'sha256=X2b3nUhiGjaWHxmPO/YQzUvHXBNac4gPjZ5/bjXrhQY=',
        payload,
        secret
      )
    ).toBe(true)
  })

  test('should return false', () => {
    expect(verifySignature('sha256=foobar123', payload, secret)).toBe(false)
  })
})
