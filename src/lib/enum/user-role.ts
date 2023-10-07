const ROLE_MAPPING = {
  1: "Manager",
  2: "Technician",
  3: "Bureau"
}

export const getRoleName = (id: 1 | 2): string => {
  return ROLE_MAPPING[id]
}
