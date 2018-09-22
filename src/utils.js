export const isMemberPropValid = members => {
  if (members === undefined) {
    return false
  }

  if (!(typeof members === 'string' || Array.isArray(members))) {
    return false
  }

  return true
}

export const createMemberPatchQuery = ({ members, operation }) => {
  return members.map(member => ({
    op: operation,
    path: '/members',
    value: {
      email: member
    }
  }))
}

export const buildUrlWithParams = (url, params = {}) => {
  const queryParams = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')

  return queryParams ? `${url}?${queryParams}` : url
}
