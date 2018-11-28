import { TypeformHttpClient } from './http-client';
import { ITypeform } from './interface';
import { FONTS_AVAILABLE } from './constants';

export class TypeformThemes {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Creates a new theme.
   * 
   * @param args Theme to create.
   * @returns Promise that resolves with created theme.
   */
  public create(args: ITypeform.Themes.Create = {
    background: undefined, colors: undefined, font: undefined, hasTransparentButton: undefined, name: undefined
  }): Promise<ITypeform.Themes.Theme> {
    const { background, colors, font, hasTransparentButton, name } = args;

    // check if required properties are defined
    if ([name, font, colors].includes(undefined)) {
      throw `Please add the required fields`;
    }

    if (!FONTS_AVAILABLE.includes(font)) {
      throw `It's not a valid font`;
    }

    return this._http.request({
      method: 'post',
      url: `/themes`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    });
  }

  /**
   * Deletes a theme from your Typeform account.
   * 
   * @param args.id Theme ID.
   * @returns Promise that resolves on success.
   */
  public delete(args: { id: string } = { id: undefined }): Promise<null> {
    const { id } = args;

    return this._http.request({
      method: 'delete',
      url: `/themes/${id}`
    });
  }

  /**
   * Retrieves a theme in your Typeform account.
   * 
   * @param args.id Theme ID.
   * @returns Promise that resolves with theme.
   */
  public get(args: { id: string } = { id: undefined }): Promise<ITypeform.Themes.Theme> {
    const { id } = args;

    return this._http.request({
      method: 'get',
      url: `/themes/${id}`
    });
  }

  /**
   * Retrieves a list of JSON descriptions for all themes in your Typeform account (public and private). Themes are listed in reverse-chronological order based on the date you added them to your account.
   * 
   * @param args.page The page of results to retrieve. Default 1 is the first page of results.
   * @param args.pageSize Number of results to retrieve per page. Default is 10. Maximum is 200.
   * @returns Promise that resolves with a list of themes.
   */
  public list(args: { page?: number, pageSize?: number } = { page: undefined, pageSize: undefined }): Promise<ITypeform.Themes.List> {
    const { page, pageSize } = args;

    return this._http.request({
      method: 'get',
      url: '/themes',
      params: {
        page,
        page_size: pageSize
      }
    });
  }

  /**
   * Updates a theme in your Typeform account. NOTE: You can't change Typeform's public themes (the built-in themes that are available in all accounts).
   * 
   * @param Updated theme with theme ID. 
   * @returns Promise that resolves with created theme.
   */
  public update(args: ITypeform.Themes.Update = {
    id: undefined, background: undefined, colors: undefined, font: undefined, hasTransparentButton: undefined, name: undefined
  }): Promise<ITypeform.Themes.Theme> {
    const { id, background, colors, font, hasTransparentButton, name } = args;

    // check if required properties are defined
    if ([name, font, colors].includes(undefined)) {
      throw `Please add the required fields`
    }

    if (!FONTS_AVAILABLE.includes(font)) {
      throw `It's not a valid font`
    }

    return this._http.request({
      method: 'put',
      url: `/themes/${id}`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    });
  }
}
