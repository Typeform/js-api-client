import { Typeform } from './typeform-types'

export class Responses {
  constructor(private _http: Typeform.HTTPClient) {}

  public delete(args: { uid: string; ids: string | string[] }): Promise<null> {
    const { uid, ids } = args

    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/responses`,
      params: {
        included_tokens: toCSL(ids),
      },
    })
  }

  public list(args: {
    uid: string
    pageSize?: number
    since?: string
    until?: string
    after?: string
    before?: string
    ids?: string | string[]
    completed?: boolean
    sort?: string
    query?: string
    fields?: string | string[]
  }): Promise<Typeform.API.Responses.List> {
    const {
      uid,
      pageSize,
      since,
      until,
      after,
      before,
      ids,
      completed,
      sort,
      query,
      fields,
    } = args

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/responses`,
      params: {
        page_size: pageSize,
        since,
        until,
        after,
        before,
        included_response_ids: toCSL(ids),
        completed,
        sort,
        query,
        fields: toCSL(fields),
      },
    })
  }
}

const toCSL = (args: string | string[]): string => {
  if (!args || !(typeof args === 'string' || Array.isArray(args))) {
    return null
  }

  return typeof args === 'string' ? args : args.join(',')
}
