import { TypeformHttpClient } from './http-client';
import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class TypeformWorkspaces {
  constructor(private _http: TypeformHttpClient) { }

  public add({ name }): Promise<Response> {
    if (name === undefined) {
      throw `A name is required`
    }

    return this._http.request({
      method: 'post',
      url: `/workspaces`
    });
  }

  public addMembers({ id, members }): Promise<Response> {
    if (!isMemberPropValid(members)) {
      throw `No member provided`
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'add'
    });

    return this.update({ id, data: membersQuery });
  }

  public delete({ id }): Promise<Response> {
    return this._http.request({
      method: 'delete',
      url: `/workspaces/${id}`
    });
  }

  public get({ search, page, pageSize } = { search, page, pageSize }): Promise<Response> {
    return this._http.request({
      method: 'get',
      url: '/workspaces',
      params: {
        page,
        page_size: pageSize,
        search
      }
    });
  }

  public list({ id }): Promise<Response> {
    return this._http.request({
      method: 'get',
      url: `/workspaces/${id}`
    });
  }

  public removeMembers({ id, members }): Promise<Response> {
    if (!isMemberPropValid(members)) {
      throw `No member provided`
    }

    const membersToAdd = !Array.isArray(members) ? [members] : members
    const membersQuery = createMemberPatchQuery({
      members: membersToAdd,
      operation: 'remove'
    });

    return this.update({ id, data: membersQuery });
  }

  public update({ id, data } = { id, data }): Promise<Response> {
    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      data
    });
  }
}
