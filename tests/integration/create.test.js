import {
  createClient
} from '../../lib/typeform'

const typeformClient = createClient({
  token: process.env.TYPEFORM_TOKEN
})
const testTypeform = 'LkhdUI'
const randomString = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

test('Getting forms from my account', done => {
  typeformClient
    .getForms()
    .then(response => {
      const {
        data,
        status
      } = response
      expect(data.total_items).toBeTruthy()
      expect(data.items).toBeTruthy()
      expect(status).toBe(200)
      done()
    })
})

test('Gets the correct form by UID', done => {

  typeformClient
    .getForm({
      uid: testTypeform
    })
    .then(response => {
      const {
        data,
        status
      } = response
      expect(data.id).toEqual(testTypeform)
      expect(status).toBe(200)
      done()
    })
})

test('Update only title of typeform', done => {
  const newTitle = 'integration test - ' + randomString()
  typeformClient
    .updateForm({
      uid: testTypeform,
      data: [
        {
          "op": "replace",
          "path": "/title",
          "value": newTitle
        }
      ]
    })
    .then(response => {
      const {
        data,
        status
      } = response

      expect(status).toBe(204)
      done()
    })
})

test('Replaces the title sending the form schema', done => {
  const newTitle = 'integration test - ' + randomString()
  typeformClient
    .updateForm({
      uid: testTypeform,
      override: true,
      data: {
        "title": newTitle,
        "theme": {
          "href": "https://api.typeform.com/themes/6lPNE6"
        }
      }
    })
    .then(response => {
      const {
        data,
        status
      } = response

      expect(status).toBe(200)
      expect(data.title).toBe(newTitle)
      done()
    })
})

let formUId
test('Create a form', done => {
  const newTitle = randomString()

  typeformClient
    .createForm({
      data: {
        "title": newTitle,
        "theme": {
          "href": "https://api.typeform.com/themes/6lPNE6"
        }
      }
    })
    .then(response => {
      const {
        data,
        status
      } = response

      expect(status).toBe(201)
      expect(data.title).toBe(newTitle)
      formUId = data.id

      done()
    })
})

test('Delete created form', done => {
  const newTitle = randomString()

  typeformClient
    .deleteForm({
      uid: formUId
    })
    .then(response => {
      const {
        status
      } = response

      expect(status).toBe(204)
      done()
    })
})
