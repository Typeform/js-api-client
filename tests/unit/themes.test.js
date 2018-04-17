import axios from 'axios'
import { stub, spy } from 'sinon'
import {
  getThemes,
  getTheme,
  createTheme,
  deleteTheme
} from '../../lib/themes'

const mockThemePayload = {
  name: 'New theme',
  colors: {
    answer: '#4FB0AE',
    background: '#FFFFF',
    button: '#4FB0AE',
    question: '#DDDDDD'
  },
  font: 'Arial'
}

beforeEach(() => {
  stub(axios, 'request').returns({})
})

afterEach(() => {
  axios.request.restore()
})

test('Get themes has the correct path', () => {
  getThemes(axios)
  expect(axios.request.args[0][0].url).toBe('/themes')
})

test('Get themes has the correct parameters', () => {
  getThemes(axios, {page: 3, page_size: 15})
  expect(axios.request.args[0][0].data.page).toBe(3)
  expect(axios.request.args[0][0].data.page_size).toBe(15)
})

test('Get themes has the correct path', () => {
  getTheme(axios, { id: 2 })
  expect(axios.request.args[0][0].url).toBe('/themes/2')
})

test('Creating a theme has the correct method', () => {
  createTheme(axios, mockThemePayload)
  expect(axios.request.args[0][0].method).toBe('post')
})

test('Throws if required values are not sent', () => {

  const { name, ...incompletePayload } = mockThemePayload
  expect(() => createTheme(axios, incompletePayload)).toThrow()
})

test('Throws if a font name is not supported', () => {
  expect(() => createTheme(axios, {
    ...mockThemePayload,
    font: 'asdf'
  })).toThrow()
})

test.only('Delete a theme has the correct path', () => {
  deleteTheme(axios, { id: 2 })
  expect(axios.request.args[0][0].url).toBe('/themes/2')
})

test.only('Delete a theme has the correct method', () => {
  deleteTheme(axios, mockThemePayload)
  expect(axios.request.args[0][0].method).toBe('delete')
})
