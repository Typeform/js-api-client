import { TypeformHttpClient } from '../../src/http-client';
import { API_BASE_URL } from '../../src/constants';
import { TypeformImages } from '../../src/images';

declare const fetch: any;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}));
});

const http = new TypeformHttpClient({
  token: '123'
});
const imagesRequest = new TypeformImages(http);

test('get images collection', () => {
  imagesRequest.list();
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images`);
});

test('get images by ID', () => {
  imagesRequest.get({ id: 'abc123' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123`);
  expect(fetch.mock.calls[0][1].method).toBe('get');
});

test('adding an image pass the required values', () => {
  imagesRequest.add({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    mediaType: 'image/gif',
    fileName: 'newimage.gif'
  });

  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images`);
  expect(fetch.mock.calls[0][1].method).toBe('post');

  const imageData = fetch.mock.calls[0][1].body;
  expect(imageData).toEqual(JSON.stringify({
    image: 'bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==',
    file_name: 'newimage.gif',
    media_type: 'image/gif'
  }));
});

test('deleting an image sets the correct method and id', () => {
  imagesRequest.delete({ id: 'abc123' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123`);
  expect(fetch.mock.calls[0][1].method).toBe('delete');
});

test('it set the correct header when retrieving the image json description', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json' });
  expect(fetch.mock.calls[0][1].headers.Accept).toBe('application/json');
});

test('when getting an image by size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json', size: 'mobile' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/image/mobile`);
});

test('when getting an image by size what does not exists throws', () => {
  // @ts-ignore
  expect(() => imagesRequest.get({ id: 'abc123', size: 'big' })).toThrow(
    `Image size doesn't exists`
  );
});

test('when getting an image by background size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', returns: 'json', backgroundSize: 'tablet' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/background/tablet`);
});

test('when getting an image by choice size it retrieves from the correct endpoint', () => {
  imagesRequest.get({ id: 'abc123', choiceSize: 'supersize' });
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/images/abc123/choice/supersize`);
});
