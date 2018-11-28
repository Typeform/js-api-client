import { TypeformHttpClient } from '../../src/http-client';
import { API_BASE_URL } from '../../src/constants';
import { TypeformWebhooks } from '../../src/webhooks';

declare const fetch: any;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}));
});

const http = new TypeformHttpClient({
  token: '123'
});
const webhooksRequest = new TypeformWebhooks(http);

test('List webhooks has the correct path and method', () => {
  webhooksRequest.get({ uid: 2, tag: 'test' });
  expect(fetch.mock.calls[0][1].method).toBe('get');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`);
});

test('Create a new webhooks has the correct path, method and url', () => {
  webhooksRequest.create({
    uid: '2',
    tag: 'test',
    url: 'http://test.com',
    enable: true
  });

  const bodyParsed = JSON.parse(fetch.mock.calls[0][1].body);
  expect(fetch.mock.calls[0][1].method).toBe('put');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`);
  expect(bodyParsed.url).toBe('http://test.com');
})

test('Create a new webhooks requires a url', () => {
  // @ts-ignore
  expect(() => webhooksRequest.create({ uid: '2', tag: 'test' })).toThrow();
});

test('update a new webhooks sends the correct payload', () => {
  webhooksRequest.update({
    uid: '2',
    tag: 'test',
    url: 'http://example.com'
  });

  const bodyParsed = JSON.parse(fetch.mock.calls[0][1].body);
  expect(bodyParsed.url).toBe('http://example.com');
  expect(fetch.mock.calls[0][1].method).toBe('put');
});

test('Delete a webhook has the correct path and method', () => {
  webhooksRequest.delete({ uid: '2', tag: 'test' });
  expect(fetch.mock.calls[0][1].method).toBe('delete');
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`);
});
