import { TypeformHttpClient } from '../../src/http-client'
import { TypeformClient } from '../../src/index'

declare const fetch: any;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}));
});

test('client constructor has a request function property', () => {
  const client = new TypeformHttpClient({
    token: '12345'
  });
  expect(client.request).toBeDefined();
});

test('Initialising fails when missing the token', () => {
  expect(() => (new TypeformClient())).toThrow('Token is missing');
});
