import { Typeform } from './typeform-types'
import { autoPageItems } from './auto-page-items'
import { removeFormKeys } from './utils'

export class Forms {
  private _messages: FormMessages

  constructor(private _http: Typeform.HTTPClient) {
    this._messages = new FormMessages(_http)
  }

  get messages(): FormMessages {
    return this._messages
  }

  public create(args: { data: Typeform.Form }): Promise<Typeform.Form> {
    const { data } = args

    return this._http.request({
      method: 'post',
      url: `/forms`,
      data,
    })
  }

  public delete(args: { uid: string }): Promise<null> {
    const { uid } = args

    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}`,
    })
  }

  public get(args: { uid: string }): Promise<Typeform.Form> {
    const { uid } = args

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}`,
    })
  }

  public list(args?: {
    page?: number | 'auto'
    pageSize?: number
    search?: string
    workspaceId?: string
  }): Promise<Typeform.API.Forms.List> {
    const { page, pageSize, search, workspaceId } = args || {
      page: null,
      pageSize: null,
      search: null,
      workspaceId: null,
    }

    const request = (page: number, pageSize: number) =>
      this._http.request({
        method: 'get',
        url: `/forms`,
        params: {
          page,
          page_size: pageSize,
          search,
          workspace_id: workspaceId,
        },
      })

    if (page === 'auto') {
      return autoPageItems(request)
    }

    return request(page, pageSize)
  }

  public update<T extends boolean>(args: {
    uid: string
    override?: T
    data: T extends true
      ? Typeform.Form
      : Typeform.API.PATCH<
          | '/settings/facebook_pixel'
          | '/settings/google_analytics'
          | '/settings/google_tag_manager'
          | '/settings/is_public'
          | '/settings/meta'
          | '/cui_settings'
          | '/theme'
          | '/title'
          | '/workspace'
        >[]
  }): Promise<T extends true ? Typeform.Form : null> {
    const { uid, override, data } = args
    const methodType = override ? 'put' : 'patch'

    return this._http.request({
      method: methodType,
      url: `/forms/${uid}`,
      data,
    })
  }

  public async copy(args: {
    uid: string
    workspaceHref: string
  }): Promise<Typeform.Form> {
    const { uid, workspaceHref } = args
    const input = await this.get({ uid })

    const data = removeFormKeys(input) as Typeform.Form

    if (workspaceHref) {
      data.workspace = { href: workspaceHref }
    }

    return this.create({ data })
  }
}

class FormMessages {
  constructor(private _http: Typeform.HTTPClient) {}

  public get(args: { uid: string }): Promise<Typeform.Messages> {
    const { uid } = args

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/messages`,
    })
  }

  public update(args: { uid: string; data: Typeform.Messages }): Promise<null> {
    const { uid, data } = args

    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/messages`,
      data,
    })
  }
}
