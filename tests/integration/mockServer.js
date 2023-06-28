const path = require('path')
 
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/forms', (req, res) => {
  const db = router.db.getState()
  res.jsonp({
    items: [db.forms],
    total_items: db.forms.length,
  })
})
server.use(router)

server.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running')
})
