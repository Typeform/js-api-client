import { Typeform } from './typeform-types'
import { autoPageItems } from './auto-page-items'

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

  public update(args: {
    uid: string
    override?: boolean
    data: Typeform.Form
  }): Promise<Typeform.Form> {
    const { uid, override, data } = args
    const methodType = override ? 'put' : 'patch'

    return this._http.request({
      method: methodType,
      url: `/forms/${uid}`,
      data,
    })
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
