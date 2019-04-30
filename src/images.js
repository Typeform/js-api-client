export default http => new Images(http);

class Images {
  constructor(_http) {
    this._http = _http;
  }

  add({ image, mediaType, fileName}  = {}) {
    return this._http.request({
      method: 'post',
      url: `/images`,
      data: {
        image,
        file_name: fileName,
        media_type: mediaType
      }
    });
  }

  delete({ id }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/images/${id}`
    });
  }

  get({ id, returns, size, backgroundSize, choiceSize }  = {}) {
    const requestQuery = {
      method: 'get',
      url: `/images/${id}`
    };
  
    if (returns === 'json') {
      requestQuery.headers = {
        Accept: 'application/json'
      };
    }
  
    if (size !== undefined) {
      if (['default', 'thumbnail', 'mobile'].includes(size)) {
        requestQuery.url += `/image/${size}`;
      } else {
        throw new Error(`Image size doesn't exists`);
      }
    }
  
    if (backgroundSize !== undefined) {
      if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
        requestQuery.url += `/background/${backgroundSize}`;
      } else {
        throw new Error(`Image background size doesn't exists`);
      }
    }
  
    const choiceImageSizes = [
      'default',
      'thumbnail',
      'supersize',
      'supermobile',
      'supersizefit',
      'supermobilefit'
    ];

    if (typeof choiceSize !== 'undefined' && choiceImageSizes.includes(choiceSize)) {
        requestQuery.url += `/choice/${choiceSize}`;
    } else if (typeof choiceSize !== 'undefined' && !choiceImageSizes.includes(choiceSize)) {
      throw new Error(`Image choice size doesn't exist`);
    }
  
    return this._http.request(requestQuery);
  }

  list() {
    return this._http.request({
      method: 'get',
      url: '/images'
    });
  }
}