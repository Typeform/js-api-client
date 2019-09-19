import { Typeform } from './typeform-types'
import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class Teams {
  constructor (private _http: Typeform.HTTPClient) { }

  public get (): Promise<any> {
    return this._http.request({
      method: 'get',
      url: '/teams/mine'
    })
  }

  public addMembers (args: { members: string | string[] }): Promise<any> {
    const { members } = args

    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery(membersToAdd, 'add')

    return this._http.request({
      method: 'patch',
      url: '/teams/mine',
      data: membersQuery
    })
  }

  public removeMembers (args: { members: string | string[] }): Promise<void> {
    const { members } = args

    if (!isMemberPropValid(members)) {
      throw new Error(`No member provided`)
    }

    const membersToRemove = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery(membersToRemove, 'remove')

    return this._http.request({
      method: 'delete',
      url: '/teams/mine',
      data: membersQuery
    })
  }
}
