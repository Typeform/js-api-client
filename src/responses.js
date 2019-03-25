export default http => new Responses(http);

class Responses {
  constructor(_http) {
    this._http = _http;
  }

  list({ uid, pageSize, since, until, after, before, completed, sort, query, fields } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/responses`,
      params: {
        page_size: pageSize,
        since,
        until,
        after,
        before,
        completed,
        sort,
        query,
        fields
      }
    });
  }
}