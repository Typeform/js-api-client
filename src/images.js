export const images = http => ({
  list: () => getImages(http),
  get: args => getImage(http, args),
  add: args => addImage(http, args),
  remove: args => removeImage(http, args)
});
export const getImages = http => {
  return http.request({
    method: 'get',
    url: '/images'
  });
};

export const getImage = (
  http,
  { id, returns, size, backgroundSize, choiceSize }
) => {
  let requestQuery = {
    method: 'get',
    url: `/images/${id}`
  };

  if (returns === 'json') {
    requestQuery['headers'] = {
      Accept: 'application/json'
    };
  }

  if (size !== undefined) {
    if (['default', 'thumbnail', 'mobile'].includes(size)) {
      requestQuery['url'] += `/image/${size}`;
    } else {
      throw `Image size doesn't exists`;
    }
  }

  if (backgroundSize !== undefined) {
    if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
      requestQuery['url'] += `/background/${backgroundSize}`;
    } else {
      throw `Image background size doesn't exists`;
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
  if (choiceSize !== undefined) {
    if (choiceImageSizes.includes(choiceSize)) {
      requestQuery['url'] += `/choice/${choiceSize}`;
    } else {
      throw `Image choice size doesn't exists`;
    }
  }

  return http.request(requestQuery);
};

export const addImage = (http, { image, media_type, file_name }) => {
  return http.request({
    method: 'post',
    url: `/images`,
    data: {
      image,
      file_name,
      media_type
    }
  });
};

export const deleteImage = (http, { id }) => {
  return http.request({
    method: 'delete',
    url: `/images/${id}`
  });
};
