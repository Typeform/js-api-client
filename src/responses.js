export default http => ({
  list: args => getResponses(http, args)
})

const getResponses = (
  http,
  {
    uid,
    page_size,
    since,
    until,
    after,
    before,
    completed,
    sort,
    query,
    fields
  } = {}
) => {
  return http.request({
    method: 'get',
    url: `/forms/${uid}/responses`,
    page_size,
    since,
    until,
    after,
    before,
    completed,
    sort,
    query,
    fields
  })
}
