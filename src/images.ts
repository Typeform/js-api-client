import { TypeformHttpClient } from './http-client';
import { ITypeform } from './interface';

export class TypeformImages {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Adds an image in your Typeform account.
   * Specify the URL of your image or send your image in base64 format, which encodes the image data as ASCII text.
   * You can use a tool like Base64 Image Encoder to get the base64 code for the image you want to add.
   * 
   * @param args.image Base64 code for the image. Note that base64 encoders may add descriptors to the code (such as data:image/png;base64,)
   * Do not include these descriptors in your image string---include only the base64 code.
   * @param args.mediaType
   * @param args.fileName File name for the image.
   * @returns Promise that resolves on success.
   */
  public add(args: { image?: string, mediaType?, fileName?: string } = {}): Promise<null> {
    const { image, mediaType, fileName } = args;

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

  /**
   * Deletes an image from your Typeform account.
   * 
   * @param args.id Unique ID for the image to retrieve.
   * @returns Promise that resolves on success.
   */
  public delete(args: { id: string } = { id: undefined }): Promise<null> {
    const { id } = args;

    return this._http.request({
      method: 'delete',
      url: `/images/${id}`
    });
  }

  /**
   * Retrieves the JSON description or the binary of the original image for the specified image_id.
   * NOTE: Default is to return the binary of the original image.
   * Use the Accept header to specify application/json to return the JSON description of the image instead.
   * 
   * @param args.id Unique ID for the image to retrieve.
   * @param args.returns Default is to return the binary of the original image.
   * Use 'json' to specify application/json to return the JSON description of the image instead.
   * @param args.size Image size to retrieve. Options include "default", "thumbnail", "mobile"
   * @param args.backgroundSize Image size to retrieve. Options include "default", "thumbnail", "mobile", "tablet"
   * @param args.choiceSize Image size to retrieve.
   * Options include "default", "thumbnail", "supersize", "supermobile", "supersizefit", "supermobilefit"
   * @returns Promise that resolves with image resource with associated metadata.
   */
  public get(args: {
    id: string,
    returns?: string,
    size?: 'default' | 'thumbnail' | 'mobile',
    backgroundSize?: 'default' | 'thumbnail' | 'mobile' | 'tablet',
    choiceSize?: 'default' | 'thumbnail' | 'supersize' | 'supermobile' | 'supersizefit' | 'supermobilefit'
  } = {
    id: undefined
  }): Promise<ITypeform.Images.Image> {
    const { id, returns, size, backgroundSize, choiceSize } = args;

    const requestQuery = {
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
        throw new Error(`Image size doesn't exists`);
      }
    }

    if (backgroundSize !== undefined) {
      if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
        requestQuery['url'] += `/background/${backgroundSize}`;
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
    if (choiceSize !== undefined) {
      if (choiceImageSizes.includes(choiceSize)) {
        requestQuery['url'] += `/choice/${choiceSize}`;
      } else {
        throw new Error(`Image choice size doesn't exists`);
      }
    }

    return this._http.request(requestQuery);
  }

  /**
   * Retrieves a list of JSON descriptions for all images in your Typeform account.
   * Images are listed in reverse-chronological order based on the date you added them to your account.
   * 
   * @returns Promise that resolves with an array of image descriptions.
   */
  public list(): Promise<ITypeform.Images.ListImage[]> {
    return this._http.request({
      method: 'get',
      url: '/images'
    });
  }
}
