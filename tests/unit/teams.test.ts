import { TypeformHttpClient } from '../../src/http-client';
import { API_BASE_URL } from '../../src/constants';
import { TypeformTeams } from '../../src/teams';

declare const fetch: any;

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify({}));
});

const http = new TypeformHttpClient({
  token: '123'
});
const teamsRequest = new TypeformTeams(http);

test('getTeam has the correct url in the request', () => {
  teamsRequest.get();
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/teams/mine`);
});

test('addMember will set the proper method', () => {
  teamsRequest.addMembers({ members: ['test@test.com'] });
  expect(fetch.mock.calls[0][1].method).toBe('patch');
});

test('if a member is sent as string it will work as expected', () => {
  teamsRequest.addMembers({ members: 'test@test.com' });
  expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify([
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ]));
});

test('it will support array or multiple members at a time', () => {
  teamsRequest.addMembers({ members: ['test@test.com', 'test2@test.com'] });
  expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify([
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    },
    {
      op: 'add',
      path: '/members',
      value: {
        email: 'test2@test.com'
      }
    }
  ]));
});

test('if no members or incorrect format defined throws', () => {
  expect(() => teamsRequest.addMembers({ members: null })).toThrow();
});

test('removeMember will set the proper method', () => {
  teamsRequest.removeMembers({ members: ['test@test.com'] });
  expect(fetch.mock.calls[0][1].method).toBe('delete');
});

test('if a member is sent as string it will work as expected', () => {
  teamsRequest.removeMembers({ members: 'test@test.com' });
  expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify([
    {
      op: 'remove',
      path: '/members',
      value: {
        email: 'test@test.com'
      }
    }
  ]));
});
