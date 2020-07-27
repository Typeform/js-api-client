import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Account } from '../../src/account'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const accountRequest = new Account(http)

const accountId = 'AA11aa'
const memberId = 'BB11bb'

const member = {
    email: 'test@typeform.com',
    role: 'owner'
}

test('getAccount has the correct url in the request', async () => {
  await accountRequest.get(accountId)
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/accounts/${accountId}`)
})

test('addMember will set the proper method', async () => {
  await accountRequest.addMember(accountId, member)
  expect(axios.history.post[0].method).toBe('post')
})


test('if no members or incorrect format defined throws', () => {
  // @ts-ignore
  expect(() => accountRequest.addMembers({ members: {} })).toThrow()
})

test('removeMember will set the proper method', async () => {
  await accountRequest.removeMember(accountId, memberId)
  expect(axios.history.delete[0].method).toBe('delete')
})
