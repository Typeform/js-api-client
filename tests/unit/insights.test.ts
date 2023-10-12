import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { Insights } from '../../src/insights'
import { API_BASE_URL } from '../../src/constants'

beforeEach(() => {
  axios.reset()
  axios.onAny().replyOnce(200, {})
})

const http = clientConstructor({
  token: '123',
})
const insightsRequest = new Insights(http)

test('get insights summary has correct method and path', async () => {
  const uid = 'foobar'
  await insightsRequest.summary({ uid })
  expect(axios.history.get[0].url).toBe(
    `${API_BASE_URL}/insights/${uid}/summary`
  )
  expect(axios.history.get[0].method).toBe('get')
})
