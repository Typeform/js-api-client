import { createClient } from '../../src/typeform'

jest.mock('../../src/constants', () => ({ API_BASE_URL: 'http://localhost:3000' }))

const typeformClient = createClient({
  token: '123456'
})
const TYPEFORM_UID = 'abc123'

const randomString = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}

test('Getting forms from my account', done => {
  typeformClient.forms.list().then(response => {
    expect(response.total_items).toBe(2)
    expect(response.items).toBeTruthy()
    done()
  })
})

test('Gets the correct form by UID', done => {
  typeformClient.forms
    .get({
      uid: TYPEFORM_UID
    })
    .then(response => {
      expect(response.id).toEqual(TYPEFORM_UID)
      done()
    })
})
