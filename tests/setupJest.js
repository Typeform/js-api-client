if (process.env.MOCK_FETCH) {
  global.fetch = require('jest-fetch-mock')
}
