
import { TypeformHttpClient } from './http-client';
import { ITypeform } from './interface';

export class TypeformWebhooks {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Create a webhook.
   * 
   * @param args Arguments to create a webhook;
   * @returns Promise that resolves with created webhook.
   */
  public create(args: ITypeform.Webhooks.CreateOrUpdate = {
    uid: undefined, tag: undefined, url: undefined
  }): Promise<ITypeform.Webhooks.WebHook> {
    return createOrUpdateWebhook(this._http, args);
  }

  /**
   * Delete a webhook.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param args.tag Unique name you want to use for the webhook.
   * @returns Promise that resolves on success.
   */
  public delete(args: { uid: string, tag: string } = { uid: undefined, tag: undefined }): Promise<Response> {
    const { uid, tag } = args;

    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  /**
   * Retrieve data about a webhook.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param args.tag Unique name you want to use for the webhook.
   * @returns Promise that resolves with created webhook.
   */
  public get(args: { uid, tag } = { uid: undefined, tag: undefined }): Promise<ITypeform.Webhooks.WebHook> {
    const { uid, tag } = args;

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  /**
   * Updates a webhook.
   * 
   * @param args Arguments to update a webhook;
   * @returns Promise that resolves with updated webhook.
   */
  public update(args: ITypeform.Webhooks.CreateOrUpdate = {
    uid: undefined, tag: undefined, url: undefined
  }): Promise<ITypeform.Webhooks.WebHook> {
    return createOrUpdateWebhook(this._http, args);
  }
}




const createOrUpdateWebhook = (http: TypeformHttpClient, args: ITypeform.Webhooks.CreateOrUpdate): Promise<ITypeform.Webhooks.WebHook> => {
  const { uid, tag, url, enable = false } = args;
  if (url === undefined) {
    throw new Error(`Please provide an url for ${tag}`)
  }
  if (tag === undefined) {
    throw new Error(`Please provide a tag name for the webhook`)
  }
  return http.request({
    method: 'put',
    url: `/forms/${uid}/webhooks/${tag}`,
    data: {
      url,
      enable
    }
  })
}
