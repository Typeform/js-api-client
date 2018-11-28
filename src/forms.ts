import { TypeformHttpClient } from './http-client';
import { ITypeform } from './interface';

export class TypeformForms {
  constructor(private _http: TypeformHttpClient) { }

  get messages(): TypeformMessages {
    return new TypeformMessages(this._http);
  }

  /**
   * Creates a form.
   * 
   * @param args.data Form to be created.
   * @returns Promise that resolves on success.
   */
  public create(args: { data: ITypeform.Forms.Create }): Promise<null> {
    const { data } = args;

    return this._http.request({
      method: 'post',
      url: `/forms`,
      data
    });
  }

  /**
   * Deletes the form with the given form_id and all of the form's responses.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns Promise that resolves on success.
   */
  public delete(args: { uid: string }): Promise<null> {
    const { uid } = args;

    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}`
    });
  }

  /**
   * Retrieves a form by the given form_id. Includes any theme and images attached to the form as references.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns Promise that resolves with Form.
   */
  public get(args: { uid: string }): Promise<ITypeform.Forms.Get> {
    const { uid } = args;

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}`
    });
  }

  /**
   * Retrieves a list of JSON descriptions for all forms in your Typeform account (public and private). Forms are listed in reverse-chronological order based on the last date they were modified.
   * 
   * @param args.page The page of results to retrieve. Default 1 is the first page of results.
   * @param args.pageSize Number of results to retrieve per page. Default is 10. Maximum is 200.
   * @param args.search Returns items that contain the specified string
   * @param args.workspaceId Retrieve typeforms for the specified workspace.
   * @returns Promise that resolves with list of all Form.
   */
  public list(args: { page?: number, pageSize?: number, search?: string, workspaceId?: string }): Promise<ITypeform.Forms.List> {
    const { page, pageSize, search, workspaceId } = args;
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

  /**
   * Updates an existing form.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param args.override Set update to be put rather than patch
   * @param args.data Update data
   * @returns Promise that resolves on success.
   */
  public update(args: { uid: string, override?: boolean, data: any }): Promise<null> {
    const { uid, override, data } = args;

    return this._http.request({
      method: (override) ? 'put' : 'patch',
      url: `/forms/${uid}`,
      data
    });
  }
}

class TypeformMessages {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Retrieves the customizable messages for a form (specified by form_id) using the form's specified language.
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns Returns the customizable messages for a form.
   */
  public get(args: { uid: string }): Promise<ITypeform.Forms.Messages> {
    const { uid } = args;

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/messages`
    });
  }

  /**
   * Specifies new values for the customizable messages in a form (specified by form_id).
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param args.data Request body
   * @returns Promise that resolves on success.
   */
  public update(args: { uid: string, data: ITypeform.Forms.Messages }): Promise<null> {
    const { uid, data } = args;

    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/messages`,
      data
    });
  }
}
