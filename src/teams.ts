import { TypeformHttpClient } from './http-client';
import { ITypeform } from './interface';
import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class TypeformTeams {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Retrieve information about your team, including the total number of seats and which Typeform users are currently occupying seats on your team.
   * 
   * @returns Promise that resolves with information about your team as well as seats on your team.
   */
  public get(): Promise<ITypeform.Teams.Get> {
    return this._http.request({
      method: 'get',
      url: '/teams/mine'
    });
  }

  /**
   * Add team members.
   * 
   * @param args.members Array of strings, or string, of email address(es) to add to team.
   * @returns Promise that resolves on success.
   */
  public addMembers(args: { members: string | string[] } = { members: undefined }): Promise<null> {
    const { members } = args;

    if (!isMemberPropValid(members)) {
      throw `No member provided`
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    });

    return this._http.request({
      method: 'patch',
      url: '/teams/mine',
      data: membersQuery
    });
  }

  /**
   * Remove team members.
   * 
   * @param args.members Array of strings, or string, of email address(es) to remove from team.
   * @returns Promise that resolves on success.
   */
  public removeMembers(args: { members: string | string[] } = { members: undefined }): Promise<null> {
    const { members } = args;

    if (!isMemberPropValid(members)) {
      throw `No member provided`
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'remove'
    });

    return this._http.request({
      method: 'delete',
      url: '/teams/mine',
      data: membersQuery
    });
  }
}