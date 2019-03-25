import { createOrUpdateWebhook } from './utils';

export default http => new Webhooks(http);

class Webhooks {
  constructor(_http) {
    this._http = _http;
  }

  create(args) {
    return createOrUpdateWebhook(this._http, args);
  }

  delete({ uid, tag }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  get({ uid, tag }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  update(args) {
    return createOrUpdateWebhook(this._http, args);
  }
}