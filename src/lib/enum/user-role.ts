const ROLE_MAPPING = {
  1: "manager",
  2: "technician",
  3: "bureau"
}

export const getRoleName = (id: 1 | 2): string => {
  return ROLE_MAPPING[id]
}

export const getRole = (role: string): 1 | 2 | 3 => {
  if (role === "manager") {
    return 1
  } else if (role === "technician") {
    return 2
  } else {
    return 3
  }
}
