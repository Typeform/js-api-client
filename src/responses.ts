import { Typeform } from './typeform-types'
import { rateLimit } from './utils'

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
    page?: 'auto'
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
      page,
    } = args

    const request = (pageSize: number, before: string) =>
      this._http.request({
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

    if (page === 'auto') {
      return autoPageResponses(request)
    }

    return request(pageSize, before)
  }
}

const toCSL = (args: string | string[]): string => {
  if (!args || !(typeof args === 'string' || Array.isArray(args))) {
    return null
  }

  return typeof args === 'string' ? args : args.join(',')
}

// when auto-paginating, request with maximum available page size to minimize number of requests
const MAX_RESULTS_PAGE_SIZE = 1000

type RequestResultsFn = (
  pageSize: number,
  before?: string
) => Promise<Typeform.API.Responses.List>

const getLastResponseId = (items: Typeform.Response[]) =>
  items.length > 0 ? items[items.length - 1]?.response_id : null

const requestPageResponses = async (
  requestFn: RequestResultsFn,
  before: string = undefined
): Promise<Typeform.Response[]> => {
  await rateLimit()
  const { items = [] } = (await requestFn(MAX_RESULTS_PAGE_SIZE, before)) || {}
  const moreItems =
    items.length === MAX_RESULTS_PAGE_SIZE
      ? await requestPageResponses(requestFn, getLastResponseId(items))
      : []
  return [...items, ...moreItems]
}

const autoPageResponses = async (
  requestFn: RequestResultsFn
): Promise<Typeform.API.Responses.List> => {
  const { total_items = 0, items = [] } =
    (await requestFn(MAX_RESULTS_PAGE_SIZE)) || {}
  return {
    total_items,
    page_count: 1,
    items: [
      ...items,
      ...(total_items > items.length
        ? await requestPageResponses(requestFn, getLastResponseId(items))
        : []),
    ],
  }
}
