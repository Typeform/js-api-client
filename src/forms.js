export default http => new Form(http);

class Form {
  constructor(_http) {
    this._http = _http;
    this._messages = new FormMessages(_http);
  }

  get messages() {
    return this._messages;
  }

  create({ data } = {}) {
    return this._http.request({
      method: 'post',
      url: `/forms`,
      data
    });
  }

  delete({ uid } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}`
    });
  }

  get({ uid } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}`
    });
  }

  list({ page, pageSize, search, workspaceId } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms`,
      params: {
        page,
        page_size: pageSize,
        search,
        workspace_id: workspaceId
      }
    });
  }

  update({ uid, override, data } = {}) {
    const methodType = override ? 'put' : 'patch';

    return this._http.request({
      method: methodType,
      url: `/forms/${uid}`,
      data
    });
  }
}

class FormMessages {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Retrieves the customizable messages for a form (specified by form_id) using the form's specified language.
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns {Promise} Returns the customizable messages for a form.
   */
  get({ uid }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/messages`
    });
  }

  /**
   * Specifies new values for the customizable messages in a form (specified by form_id).
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {Object} args.data Request body.
   * @returns {Promise} Promise that resolves on success.
   */
  update({ uid, data }  = {}) {
    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/messages`,
      data
    });
  }
}