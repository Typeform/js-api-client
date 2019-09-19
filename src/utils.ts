import { Typeform } from './typeform-types'

export const createMemberPatchQuery = (members: string[], operation: string): Typeform.API.PATCH[] => {
  return members.map((member) => ({
    op: operation,
    path: '/members',
    value: {
      email: member
    }
  }))
}

export const isMemberPropValid = (members: string | string[]): boolean => {
  return (members && (typeof members === 'string' || Array.isArray(members)))
}
