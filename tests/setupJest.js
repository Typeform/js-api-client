if (process.env.MOCK_AXIOS) {
  global.axios = new (require('axios-mock-adapter'))(require('axios'))
}
