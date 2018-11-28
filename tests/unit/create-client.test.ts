import { TypeformHttpClient } from '../../src/http-client'
import { API_BASE_URL } from '../../src/constants';

declare var fetch: any;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}));
});

const client = new TypeformHttpClient({
  token: 'abc'
});

test('request pass correct headers', () => {
  client.request({
    url: '/forms',
    headers: {
      Accepts: 'application/json'
    }
  });

  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms`);
  expect(fetch.mock.calls[0][1].headers).toEqual({
    Accepts: 'application/json',
    Authorization: 'bearer abc'
  });
});
