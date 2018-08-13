import { clientConstructor } from '../../src/create-client'
import { forms } from '../../src/forms'
import {
  getForm,
  updateForm,
  deleteForm,
  createForm,
  getMessages,
  updateMessages
} from '../../src/forms'
import { API_BASE_URL } from '../../src/constants'


beforeEach(() => {
  fetch.resetMocks()
})

const http = clientConstructor({
  token: '123'
})
const formsRequest = forms(http)

test('getForm sends the correct UID', () => {
  formsRequest.get({ uid: 'abc123' })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`)
})

test('getForm sets get method', () => {
  formsRequest.get({ uid: 'abc123' })
  expect(fetch.mock.calls[0][1].method).toBe('get')
})

test('updateForm sends the correct UID and data', () => {
  formsRequest.update({
    uid: 'abc123', data: {
      title: 'hola'
    }
  })
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`)
  expect(fetch.mock.calls[0][1].data.title).toBe('hola')
})

test('updateForm sets patch method in request by default', () => {
  formsRequest.update({
    uid: 'abc123', data: {
      title: 'hola'
    }
  })
  expect(fetch.mock.calls[0][1].method).toBe('patch')
})


test('updateForm sets put method in request when override option is set', () => {
  formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola'
    },
    override: true
  })

  expect(fetch.mock.calls[0][1].method).toBe('put')
})

test('deleteForm removes the correct uid form ', () => {
  formsRequest.delete({
    uid: 'abc123'
  })

  expect(fetch.mock.calls[0][1].method).toBe('delete')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`)
})

test('create form has the correct path and method ', () => {
  formsRequest.create({})

  expect(fetch.mock.calls[0][1].method).toBe('post')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms`)
})

test('get messages has the correct path and method ', () => {
  formsRequest.messages.get({ uid: 'abc123' })

  expect(fetch.mock.calls[0][1].method).toBe('get')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123/messages`)
})

test('update messages has the correct path and method ', () => {
  formsRequest.messages.update({
    uid: 'abc123'
  })

  expect(fetch.mock.calls[0][1].method).toBe('put')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123/messages`)
})
