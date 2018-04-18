export const isMemberPropValid = members => {
  if (members === undefined) {
    return false;
  }

  if (!(typeof members === "string" || Array.isArray(members))) {
    return false;
  }

  return true;
};

export const createMemberPatchQuery = ({ members, operation }) => {
  return members.map(member => ({
    op: operation,
    path: "/members",
    value: {
      email: member
    }
  }));
};
