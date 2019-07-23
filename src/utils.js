export const createMemberPatchQuery = ({ members, operation }) => {
  return members.map(member => ({
    op: operation,
    path: '/members',
    value: {
      email: member
    }
  }))
}

export const isMemberPropValid = members => {
  if (!members || !(typeof members === 'string' || Array.isArray(members))) {
    return false
  }

  return true
}
