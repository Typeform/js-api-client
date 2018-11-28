import { TypeformHttpClient } from './http-client';
import { isMemberPropValid, createMemberPatchQuery } from './utils'

export class TypeformWorkspaces {
  constructor(private _http: TypeformHttpClient) { }

  public add(args: { name: string } = { name: undefined }): Promise<any> {
    const { name } = args;

    if (name === undefined) {
      throw `A name is required`
    }

    return this._http.request({
      method: 'post',
      url: `/workspaces`,
      data: {
        name
      }
    });
  }

  public addMembers({ id, members }): Promise<any> {
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

  public delete(args: { id: string } = { id: undefined }): Promise<any> {
    const { id } = args;
    return this._http.request({
      method: 'delete',
      url: `/workspaces/${id}`
    });
  }

  public get(args: { id: string } = { id: undefined }): Promise<any> {
    const { id } = args;

    return this._http.request({
      method: 'get',
      url: `/workspaces/${id}`
    });
  }

  public list(args: { search?: string, page?: number, pageSize?: number } = {}): Promise<any> {
    const { search, page, pageSize } = args;

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

  public removeMembers(args: { id: string, members: string | string[] } = { id: undefined, members: undefined }): Promise<any> {
    const { id, members } = args;

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

  public update(args: { id: string, data: any } = { id: undefined, data: undefined }): Promise<any> {
    const { id, data } = args;
    return this._http.request({
      method: 'patch',
      url: `/workspaces/${id}`,
      data
    });
  }
}
