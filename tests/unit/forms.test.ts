import { URLSearchParams } from 'url';

import { TypeformHttpClient } from '../../src/http-client'
import { API_BASE_URL } from '../../src/constants'
import { TypeformForms } from '../../src/forms'

declare const fetch: any;

beforeEach(() => {
  fetch.resetMocks()
  fetch.mockResponse(JSON.stringify({}))
});

const http = new TypeformHttpClient({
  token: '123'
});
const formsRequest = new TypeformForms(http);

test('get all forms has the correct method and path', () => {
  formsRequest.list();

  const url = fetch.mock.calls[0][0].split('?');
  expect(url[0]).toBe(`${API_BASE_URL}/forms`);
  expect(fetch.mock.calls[0][1].method).toBe('get');
});

test('paramters are sent correctly', () => {
  formsRequest.list({
    page: 2,
    pageSize: 10,
    search: 'hola',
    workspaceId: 'abc'
  });
  const url = fetch.mock.calls[0][0].split('?');
  const params = new URLSearchParams(url[1]);
  expect(params.get('page')).toBe('2');
  expect(params.get('page')).toBe('2');
  expect(params.get('page')).toBe('2');
  expect(params.get('page')).toBe('2');
});

test('getForm sends the correct UID', () => {
  formsRequest.get({ uid: 'abc123' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`);
});

test('getForm sets get method', () => {
  formsRequest.get({ uid: 'abc123' });
  expect(fetch.mock.calls[0][1].method).toBe('get');
});

test('updateForm sends the correct UID and data', () => {
  formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola'
    }
  });
  const bodyParsed = JSON.parse(fetch.mock.calls[0][1].body);
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`);
  expect(bodyParsed.title).toBe('hola');
});

test('updateForm sets patch method in request by default', () => {
  formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola'
    }
  });
  expect(fetch.mock.calls[0][1].method).toBe('patch');
});

test('updateForm sets put method in request when override option is set', () => {
  formsRequest.update({
    uid: 'abc123',
    data: {
      title: 'hola'
    },
    override: true
  });

  expect(fetch.mock.calls[0][1].method).toBe('put');
});

test('deleteForm removes the correct uid form ', () => {
  formsRequest.delete({
    uid: 'abc123'
  });

  expect(fetch.mock.calls[0][1].method).toBe('delete');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123`);
});

test('create form has the correct path and method ', () => {
  formsRequest.create({ data: null });

  expect(fetch.mock.calls[0][1].method).toBe('post');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms`);
});

test('get messages has the correct path and method ', () => {
  formsRequest.messages.get({ uid: 'abc123' });

  expect(fetch.mock.calls[0][1].method).toBe('get');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123/messages`);
});

test('update messages has the correct path and method ', () => {
  formsRequest.messages.update({
    uid: 'abc123',
    data: null
  });

  expect(fetch.mock.calls[0][1].method).toBe('put');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/abc123/messages`);
});
