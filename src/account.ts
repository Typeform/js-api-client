import { Typeform } from './typeform-types'

export class Account {
  constructor (private _http: Typeform.HTTPClient) { }
/**
 * Get user data from a give accountId
 * @param accountId account Uid
 */

  public get (accountId: string): Promise<any> {
    return this._http.request({
      method: 'get',
      url: `/accounts/${accountId}`
    })
  }

/**
 *
 * @param accountId account Uid
 * @param args member email and role
 */

  public addMember (accountId: string, member: { email: string, role: string }): Promise<any> {

    return this._http.request({
      method: 'post',
      url: `/accounts/${accountId}/members`,
      body: member
    })
  }

  /**
   *
   * @param accountId account Uid
   * @param memberId member id to delete
   */

  public removeMember (accountId: string, memberId: string): Promise<any> {

    return this._http.request({
      method: 'delete',
      url: `/accounts/${accountId}/members/${memberId}`
    })
  }
}
