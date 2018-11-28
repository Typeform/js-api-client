/* globals fetch */
import 'isomorphic-fetch';
import { API_BASE_URL } from './constants';
import { buildUrlWithParams } from './utils';

export class TypeformHttpClient {
  private _options: { [x: string]: any; } = {};
  private _token: any;

  constructor({ token, ...options }) {
    this._options = options
    this._token = token
  }

  public request(args: any): Promise<any> {
    const { url, data, headers: argsHeaders = {}, params, ...otherArgs } = args;
    const requestUrl = buildUrlWithParams(`${API_BASE_URL}${url}`, params);
    const { headers = {} } = this._options;
    const requestParameters = { ...this._options, ...otherArgs };

    return fetch(requestUrl, {
      ...requestParameters,
      body: JSON.stringify(data),
      headers: {
        ...headers,
        ...argsHeaders,
        Authorization: `bearer ${this._token}`
      }
    })
      .then(response => response.json())
      .catch(error => { throw new Error(error) })
  }
}
