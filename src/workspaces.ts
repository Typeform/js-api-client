import { Typeform } from './typeform-types'
import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class Workspaces {
  constructor (private _http: Typeform.HTTPClient) { }

  public add (args: { name: string }): Promise<Typeform.Workspace> {
    const { name } = args

    if (!name) {
      throw new Error(`A name is required`)
    }

    return this._http.request({
      method: 'post',
      url: '/workspaces',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name
      }
    })
  }

  public addMembers (args: { id: string, members: string | string[] }): Promise<null> {
    const { id, members } = args

    const data = addOrRemoveMembers('add', members)
    return this.update({ id, data })
  }

  public delete (args: { id: string }): Promise<null> {
    const { id } = args

    return this._http.request({
      method: 'delete',
      url: `/workspaces/${id}`
    })
  }

  public get (args: { id: string }): Promise<Typeform.Workspace> {
    const { id } = args

    return this._http.request({
      method: 'get',
      url: `/workspaces/${id}`
    })
  }

  public list (args?: { search?: string, page?: number, pageSize?: number }): Promise<Typeform.API.Workspaces.List> {
    const { search, page, pageSize } = args || { search: null, page: null, pageSize: null }

    return this._http.request({
      method: 'get',
      url: '/workspaces',
      params: {
        page,
        page_size: pageSize,
        search
      }
    })
  }

  public removeMembers (args: { id: string, members: string | string[] }): Promise<null> {
    const { id, members } = args
    const data = addOrRemoveMembers('remove', members)

    return this.update({ id, data })
  }

  public update (args: { id: string, data: Typeform.API.PATCH[] }): Promise<null> {
    const { id, data } = args

    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    })
  }
}

const addOrRemoveMembers = (operation: string, members: string | string[]): Typeform.API.PATCH[] => {
  if (!isMemberPropValid(members)) {
    throw new Error(`No member(s) provided`)
  }

  const membersArray = !Array.isArray(members) ? [members] : members

  return createMemberPatchQuery(membersArray, operation)
}
